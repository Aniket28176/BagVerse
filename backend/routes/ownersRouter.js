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

    // Frontend sends adminPhone
    // Also allow phone or phoneNumber as fallbacks
    const rawPhone =
      req.body.adminPhone || req.body.phone || req.body.phoneNumber;

    if (!fullname || !email || !password || !rawPhone) {
      return res.status(400).json({
        message: "All fields are required, including phone number",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Keep digits and optional +
    const phone = String(rawPhone).replace(/[^\d+]/g, "");

    // Basic phone validation
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Please enter a valid phone number",
      });
    }

    const existingOwner = await ownerModel.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (existingOwner) {
      if (existingOwner.email === normalizedEmail) {
        return res.status(409).json({ message: "Admin already exists" });
      }

      return res.status(409).json({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await ownerModel.create({
      fullname: fullname.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      role: "admin",
    });

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      req.session.user = {
        _id: owner._id,
        role: owner.role,
      };

      req.session.save(() => {
        res.status(201).json({
          message: "Admin created",
          user: req.session.user,
          owner: {
            _id: owner._id,
            fullname: owner.fullname,
            email: owner.email,
            phone: owner.phone,
            role: owner.role,
          },
        });
      });
    });
  } catch (err) {
    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0];

      if (field === "phone") {
        return res.status(409).json({ message: "Phone number already exists" });
      }

      if (field === "email") {
        return res.status(409).json({ message: "Admin already exists" });
      }

      return res.status(409).json({ message: "Duplicate value" });
    }

    res.status(500).json({ message: "Signup failed" });
  }
});

/* ======================================================
   ADMIN LOGIN
   ====================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const owner = await ownerModel.findOne({ email: normalizedEmail });

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

    res.json({
      message: "Login successful",
      user: {
        _id: owner._id,
        fullname: owner.fullname,
        email: owner.email,
        phone: owner.phone,
        role: owner.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================================================
   ADMIN PROFILE
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
    res.clearCookie("baggista.sid");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
