const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");

/* ===============================
   REGISTER
   =============================== */
module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Account already exists" });
    }

    // 🔐 ADMIN PROTECTION
    if (role === "admin") {
      if (req.body.secret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Unauthorized admin creation" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ message: "Session error" });

      req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };

      req.session.save(() => {
        res.status(201).json({
          message: "Registered successfully",
          user: req.session.user,
        });
      });
    });

  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
};

/* ===============================
   LOGIN
   =============================== */
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ message: "Session error" });

      req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };

      req.session.save(() => {
        res.json({
          message: "Login successful",
          user: req.session.user,
        });
      });
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ===============================
   LOGOUT
   =============================== */
module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("baggista.sid");
    res.json({ message: "Logged out" });
  });
};