const express = require("express");
const router = express.Router();

const isLogin = require("../middlewares/isLogin");
const userModel = require("../models/user.models");
const ownerModel = require("../models/owners.models");

const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");

/* ===============================
   TEST ROUTE
   =============================== */
router.get("/", (req, res) => {
  res.send("Users API working ✅");
});

/* ===============================
   AUTH ROUTES (PUBLIC)
   =============================== */

// USER REGISTER
router.post("/register", registerUser);

// USER LOGIN
router.post("/login", loginUser);

// USER LOGOUT
router.post("/logout", logout);

/* ===============================
   AUTH CHECK (PROTECTED)
   =============================== */
router.get("/check-auth", isLogin, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

/* ===============================
   PROFILE (USER + ADMIN)
   =============================== */
router.get("/profile", isLogin, async (req, res) => {
  try {
    /* ---------- ADMIN PROFILE ---------- */
    if (req.user.role === "admin") {
      const admin = await ownerModel
        .findById(req.user._id)
        .select("-password");

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      return res.status(200).json(admin);
    }

    /* ---------- USER PROFILE ---------- */
    const user = await userModel
      .findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      message: "Error fetching profile",
    });
  }
});

/* ===============================
   USER ORDERS (USER ONLY)
   =============================== */
router.get("/orders", isLogin, async (req, res) => {
  try {
    // Admins do not have orders
    if (req.user.role === "admin") {
      return res.status(200).json([]);
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.orders || []);

  } catch (error) {
    console.error("Orders error:", error);
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
});

module.exports = router;
