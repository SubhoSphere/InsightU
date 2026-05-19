import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/resend';

export class AuthService {
  /**
   * Generates a 6-digit OTP string.
   */
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Signs a JWT access token.
   */
  private signToken(id: string, role: Role, collegeId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured in the environment variables.');
    }
    return jwt.sign({ id, role, collegeId }, secret, { expiresIn: '1d' });
  }

  /**
   * Hashes the password, generates a random 6-digit OTP, creates the user,
   * and saves the hashed OTP in VerificationToken with a 15-minute expiration.
   */
  public async signup(email: string, passwordRaw: string, role: Role, name: string, collegeId: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    const hashed = await bcrypt.hash(passwordRaw, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
        role,
        name,
        collegeId,
        // emailVerified is omitted, keeping it null as 'false'
      },
    });

    const otp = this.generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedOTP,
        expires: expiresAt,
      },
    });

    // Send OTP via email using Resend
    await sendVerificationEmail(email, otp, name);

    return {
      userId: user.id,
      email: user.email,
      message: 'Verification code sent to your email.',
    };
  }

  /**
   * Verifies the OTP. If valid, updates emailVerified and purges the token.
   */
  public async verifyEmailOTP(email: string, otp: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found.');

    const tokenRecord = await prisma.verificationToken.findFirst({
      where: { identifier: email },
      orderBy: { expires: 'desc' },
    });

    if (!tokenRecord) throw new Error('No active verification token found for this email.');
    
    if (tokenRecord.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { id: tokenRecord.id } });
      throw new Error('OTP has expired. Please request a new one.');
    }

    const isValid = await bcrypt.compare(otp, tokenRecord.token);
    if (!isValid) throw new Error('Invalid OTP.');

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { id: tokenRecord.id } });

    return { success: true, message: 'Email successfully verified.' };
  }

  /**
   * Resends a new verification OTP to the user's email.
   * Deletes any existing tokens for that email before generating a fresh one.
   */
  public async resendVerificationOTP(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found.');

    if (user.emailVerified) {
      throw new Error('Email is already verified.');
    }

    // Clean up any existing verification tokens
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    const otp = this.generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedOTP,
        expires: expiresAt,
      },
    });

    await sendVerificationEmail(email, otp, user.name || undefined);

    return { success: true, message: 'A new verification code has been sent to your email.' };
  }

  /**
   * Validates credentials and checks if emailVerified is set. Returns a signed JWT.
   */
  public async login(email: string, passwordRaw: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials.');
    }

    if (!user.emailVerified) {
      throw new Error('Email is not verified. Please verify your email before logging in.');
    }

    const isValid = await bcrypt.compare(passwordRaw, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials.');
    }

    const token = this.signToken(user.id, user.role, user.collegeId);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        collegeId: user.collegeId,
      },
    };
  }

  /**
   * Generates a 6-digit reset OTP, hashes it, and saves it to VerificationToken.
   */
  public async generatePasswordResetOTP(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found.');

    const otp = this.generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Clean up any existing reset tokens
    await prisma.verificationToken.deleteMany({
      where: { identifier: `RESET_${email}` },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: `RESET_${email}`,
        token: hashedOTP,
        expires: expiresAt,
      },
    });

    // Send reset OTP via email
    await sendPasswordResetEmail(email, otp);

    return {
      message: 'Password reset code sent to your email.',
    };
  }

  /**
   * Validates the reset token. If matching, hashes newPassword and overwrites.
   */
  public async resetPassword(email: string, otp: string, newPasswordRaw: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found.');

    const tokenRecord = await prisma.verificationToken.findFirst({
      where: { identifier: `RESET_${email}` },
      orderBy: { expires: 'desc' },
    });

    if (!tokenRecord) throw new Error('No active reset token found.');

    if (tokenRecord.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { id: tokenRecord.id } });
      throw new Error('OTP has expired.');
    }

    const isValid = await bcrypt.compare(otp, tokenRecord.token);
    if (!isValid) throw new Error('Invalid OTP.');

    const newHashed = await bcrypt.hash(newPasswordRaw, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHashed },
    });

    await prisma.verificationToken.delete({ where: { id: tokenRecord.id } });

    return { success: true, message: 'Password reset successfully.' };
  }
}

export default new AuthService();
