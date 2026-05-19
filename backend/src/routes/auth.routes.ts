import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

// Authentication Endpoints
router.post('/signup', authController.handleSignup.bind(authController));
router.post('/verify-email', authController.handleVerifyEmail.bind(authController));
router.post('/resend-otp', authController.handleResendOTP.bind(authController));
router.post('/login', authController.handleLogin.bind(authController));
router.post('/forgot-password', authController.handleForgotPassword.bind(authController));
router.post('/reset-password', authController.handleResetPassword.bind(authController));

export default router;
