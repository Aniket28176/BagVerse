const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    /* ===============================
       CART (FIXED)
       =============================== */
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // ✅ MUST MATCH product model name
      },
    ],

    /* ===============================
       ROLE
       =============================== */
    isAdmin: {
      type: Boolean,
      default: false,
    },

    /* ===============================
       ORDERS (STRUCTURED)
       =============================== */
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    contact: {
      type: String, // ✅ phone numbers are strings
      default: "",
    },

    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
