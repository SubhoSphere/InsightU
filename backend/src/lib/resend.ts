import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'InsightU <onboarding@resend.dev>';

/**
 * Sends a 6-digit OTP verification email to the user.
 */
export async function sendVerificationEmail(to: string, otp: string, name?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Verify your InsightU account',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
          <h2 style="color: #111; margin-bottom: 8px;">Welcome to InsightU${name ? `, ${name}` : ''}!</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            Use the verification code below to complete your sign-up. This code expires in <strong>15 minutes</strong>.
          </p>
          <div style="background: #111; color: #fff; text-align: center; padding: 20px; border-radius: 8px; margin: 24px 0; letter-spacing: 8px; font-size: 32px; font-weight: 700;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 11px; text-align: center;">InsightU — Campus Intelligence Network</p>
        </div>
      `,
    });

    if (error) {
      console.warn('[Resend] Failed to send verification email via API:', error);
      console.log(`
┌────────────────────────────────────────────────────────┐
│  ⚠️  [DEVELOPMENT OTP FALLBACK] Resend Free-Tier Limit │
│                                                        │
│  Recipient: ${to}                                      
│  Verification Code: ${otp}                            │
│                                                        │
│  Copy this code to verify the account in your browser │
└────────────────────────────────────────────────────────┘
      `);
      return { id: 'fallback-id' };
    }

    console.log('[Resend] Verification email sent successfully:', data?.id);
    return data;
  } catch (err) {
    console.warn('[Resend] Email service encountered a network error:', err);
    console.log(`
┌────────────────────────────────────────────────────────┐
│  ⚠️  [DEVELOPMENT OTP FALLBACK] Resend Connection Error │
│                                                        │
│  Recipient: ${to}                                      
│  Verification Code: ${otp}                            │
│                                                        │
│  Copy this code to verify the account in your browser │
└────────────────────────────────────────────────────────┘
    `);
    return { id: 'fallback-id' };
  }
}

/**
 * Sends a password reset OTP email to the user.
 */
export async function sendPasswordResetEmail(to: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Reset your InsightU password',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
          <h2 style="color: #111; margin-bottom: 8px;">Password Reset Request</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            We received a request to reset your password. Use the code below to proceed. This code expires in <strong>15 minutes</strong>.
          </p>
          <div style="background: #111; color: #fff; text-align: center; padding: 20px; border-radius: 8px; margin: 24px 0; letter-spacing: 8px; font-size: 32px; font-weight: 700;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 13px;">If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 11px; text-align: center;">InsightU — Campus Intelligence Network</p>
        </div>
      `,
    });

    if (error) {
      console.warn('[Resend] Failed to send password reset email via API:', error);
      console.log(`
┌────────────────────────────────────────────────────────┐
│  ⚠️  [DEVELOPMENT OTP FALLBACK] Resend Free-Tier Limit │
│                                                        │
│  Recipient: ${to}                                      
│  Reset Code: ${otp}                                   │
│                                                        │
│  Copy this code to reset the password in your browser │
└────────────────────────────────────────────────────────┘
      `);
      return { id: 'fallback-id' };
    }

    console.log('[Resend] Password reset email sent successfully:', data?.id);
    return data;
  } catch (err) {
    console.warn('[Resend] Email service encountered a network error:', err);
    console.log(`
┌────────────────────────────────────────────────────────┐
│  ⚠️  [DEVELOPMENT OTP FALLBACK] Resend Connection Error │
│                                                        │
│  Recipient: ${to}                                      
│  Reset Code: ${otp}                                   │
│                                                        │
│  Copy this code to reset the password in your browser │
└────────────────────────────────────────────────────────┘
    `);
    return { id: 'fallback-id' };
  }
}
