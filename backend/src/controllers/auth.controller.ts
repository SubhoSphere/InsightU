import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

class AuthController {
  public async handleSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, role, name, collegeId } = req.body;
      const result = await authService.signup(email, password, role, name, collegeId);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async handleVerifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyEmailOTP(email, otp);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async handleResendOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const result = await authService.resendVerificationOTP(email);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async handleForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const result = await authService.generatePasswordResetOTP(email);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async handleResetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await authService.resetPassword(email, otp, newPassword);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
