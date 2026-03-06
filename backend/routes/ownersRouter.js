const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owners.models");

/* ======================================================
   ADMIN / OWNER SIGNUP
   ====================================================== */
router.post("/create", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await ownerModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await ownerModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created",
      owner: {
        _id: owner._id,
        fullname: owner.fullname,
        email: owner.email,
        role: owner.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ======================================================
   ADMIN LOGIN
   ====================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, owner.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      _id: owner._id,
      role: owner.role,
    };

    res.json({ message: "Login successful" });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================================================
   ADMIN PROFILE  ✅ FIXED
   ====================================================== */
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await ownerModel
      .findById(req.session.user._id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch {
    res.status(500).json({ message: "Profile fetch failed" });
  }
});

/* ======================================================
   ADMIN LOGOUT
   ====================================================== */
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("admin.sid");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
