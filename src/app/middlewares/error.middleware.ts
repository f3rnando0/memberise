import type { ErrorRequestHandler } from 'express';

export const error_middleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      status: err.output.statusCode,
      error: err.output.payload.error,
      message: err.message,
    });

    next(err);
  } else {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message,
    });
    next(err);
  }
};
