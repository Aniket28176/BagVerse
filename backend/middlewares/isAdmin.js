module.exports = function isAdmin(req, res, next) {
  if (!req.session || req.session.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};