module.exports = function isAdmin(req, res, next) {
  console.log("SESSION USER:", req.session.user);

  if (req.session && req.session.user) {
    req.admin = req.session.user;
    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};
