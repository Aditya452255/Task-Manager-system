const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the next middleware (your error-handler)
    }
  };
};

module.exports = asyncWrapper;