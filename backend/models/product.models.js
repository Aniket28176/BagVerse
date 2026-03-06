const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    /* ===============================
       PRODUCT IMAGE
       =============================== */
    image: {
      type: Buffer,
      required: true,
    },

    /* ===============================
       PRODUCT DETAILS
       =============================== */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    bgcolor: {
      type: String,
      default: "#ffffff",
    },

    panelcolor: {
      type: String,
      default: "#ffffff",
    },

    textcolor: {
      type: String,
      default: "#000000",
    },

    /* ===============================
       SALES / ANALYTICS
       =============================== */
    salesCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ===============================
       ADMIN / OWNER (IMPORTANT)
       =============================== */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",   // must match owners model name
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
