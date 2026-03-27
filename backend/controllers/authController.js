const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");

/* ======================================================
   REGISTER USER (PUBLIC)
   ====================================================== */
module.exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Account already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    // ✅ SIMPLE SESSION SET
    req.session.user = {
      _id: user._id,
      email: user.email,
      role: "user",
    };

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: "user",
      },
    });

  } catch (err) {
    console.error("🔥 Register error:", err);
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

/* ======================================================
   LOGIN USER (PUBLIC)
   ====================================================== */
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email or password incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password incorrect",
      });
    }

    // ✅ SESSION SET (NO regenerate)
    req.session.user = {
      _id: user._id,
      email: user.email,
      role: "user",
    };

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: "user",
      },
    });

  } catch (err) {
    console.error("🔥 Login error:", err);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ======================================================
   LOGOUT USER
   ====================================================== */
module.exports.logout = function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    // ✅ MATCH app.js cookie name
    res.clearCookie("baggista.sid", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  });
};