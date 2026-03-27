module.exports = function isAdmin(req, res, next) {
  if (
    req.session &&
    req.session.user &&
    req.session.user.role === "admin"
  ) {
    req.admin = req.session.user;
    return next();
  }

  return res.status(403).json({ message: "Admin access required" });
};
