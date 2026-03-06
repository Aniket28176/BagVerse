const express = require("express");
const router = express.Router();
const userModel = require("../models/user.models");
const productModel = require("../models/product.models");
const isLogin = require("../middlewares/isLogin");

/* ===============================
   GET CART ITEMS
   =============================== */
router.get("/", isLogin, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate({
        path: "cart",
        model: "Product",
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = user.cart.map(product => ({
      ...product.toObject(),
      image: product.image
        ? product.image.toString("base64")
        : null,
    }));

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Cart fetch error:", error);
    res.status(500).json({ error: "Error fetching cart" });
  }
});

/* ===============================
   ADD TO CART
   =============================== */
router.post("/add", isLogin, async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await userModel.findById(req.user._id);
    const product = await productModel.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: "User or Product not found" });
    }

    const alreadyInCart = user.cart.some(
      id => id.toString() === productId
    );

    if (!alreadyInCart) {
      user.cart.push(productId);
      await user.save();
    }

    res.status(200).json({
      message: "Product added to cart",
    });
  } catch (error) {
    console.error("Add cart error:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});

/* ===============================
   REMOVE FROM CART
   =============================== */
router.delete("/remove/:productId", isLogin, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cart = user.cart.filter(
      id => id.toString() !== req.params.productId
    );

    await user.save();

    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ error: "Error removing cart item" });
  }
});

module.exports = router;
