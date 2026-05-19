import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

/**
 * Standard security headers wrapper to block XSS and clickjacking vectors
 */
export const securityHeaders = helmet();

/**
 * IP rate-limiting to prevent DDoS and API endpoint spamming
 * Allows a maximum of 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
