import { Request, Response, NextFunction } from 'express';

/**
 * Centralized Custom Error Class
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Express Error-Handling Middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If it's our custom operational error
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
    });
  }

  // Fallback for unhandled programming errors (prevents sensitive leakages)
  console.error('[Unhandled Server Error Stack Trace]:', err.stack || err);

  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Internal Server Error',
  });
};
