const protect = (req, res, next) => {
  if (!req.session || !req.session.userName) {
    return next(new Error("Please login to view this content"));
  }
  next();
};

export { protect };
