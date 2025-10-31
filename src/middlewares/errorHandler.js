import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
};
