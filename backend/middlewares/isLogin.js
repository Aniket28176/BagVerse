module.exports = function isLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      authenticated: false,
      message: "Not logged in",
    });
  }

  req.user = req.session.user; // safe now
  next();
};

