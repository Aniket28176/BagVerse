const express = require("express");
const router = express.Router();

const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const userModel = require("../models/user.models");

const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");

/* AUTH */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

/* CHECK AUTH */
router.get("/check-auth", isLogin, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

/* PROFILE */
router.get("/profile", isLogin, async (req, res) => {
  const user = await userModel
    .findById(req.user._id)
    .select("-password");

  res.json(user);
});

/* ADMIN ONLY ROUTE */
router.get("/admin-only", isLogin, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin 🔥" });
});

module.exports = router;