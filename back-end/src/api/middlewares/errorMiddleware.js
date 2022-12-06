const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  console.log(err);
  if (status) return res.status(status).json({ message });

  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;