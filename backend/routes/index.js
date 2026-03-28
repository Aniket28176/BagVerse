const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLogin");
const productModel = require("../models/product.models");
const userModel = require("../models/user.models");

/* =========================================
   GET ALL PRODUCTS (SHOP)
========================================= */
router.get("/shop", async (req, res) => {
  try {
    const products = await productModel.find();

    const formatted = products.map((p) => ({
      ...p.toObject(),
      image: p.image ? p.image.toString("base64") : null,
    }));

    res.json({ products: formatted });
  } catch (error) {
    console.error("Shop error:", error);
    res.status(500).json({ message: "Error loading products" });
  }
});

/* =========================================
   GET CART
========================================= */
router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let bill = 0;

    if (user.cart.length > 0) {
      bill = user.cart.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return total + (price - discount);
      }, 0);
    }

    res.json({
      cartItems: user.cart,
      bill,
    });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ message: "Error loading cart" });
  }
});

/* =========================================
   ADD TO CART
========================================= */
router.post("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!user.cart.includes(req.params.id)) {
      user.cart.push(req.params.id);
      await user.save();

      return res.json({ message: "Added to cart" });
    }

    res.json({ message: "Item already in cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

/* =========================================
   BUY NOW
========================================= */
router.get("/buynow/:id", isLoggedIn, async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product.toObject(),
      image: product.image?.toString("base64"),
    });
  } catch (error) {
    console.error("BuyNow error:", error);
    res.status(500).json({ message: "Error loading product" });
  }
});

/* =========================================
   LOGOUT (SESSION BASED)
========================================= */
router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("baggista.sid");
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;