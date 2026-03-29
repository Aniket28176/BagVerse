const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.models");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");

/* ===============================
   GET ALL PRODUCTS
   =============================== */
router.get("/", async (req, res) => {
  const { sort, search } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let sortObj = { createdAt: -1 };
  if (sort === "priceLow") sortObj = { price: 1 };
  if (sort === "priceHigh") sortObj = { price: -1 };
  if (sort === "popular") sortObj = { salesCount: -1 };

  const products = await productModel.find(query).sort(sortObj);

  const formatted = products.map((p) => ({
    ...p.toObject(),
    image: p.image ? p.image.toString("base64") : null,
  }));

  res.json({ products: formatted });
});

/* ===============================
   ADMIN PRODUCTS
   =============================== */
router.get("/admin", isLogin, isAdmin, async (req, res) => {
  try {
    console.log("USER:", req.user); // debug

    const products = await productModel.find({
      createdBy: req.user._id, // ✅ FIXED
    });

    const formatted = products.map((p) => ({
      ...p.toObject(),
      image: p.image ? p.image.toString("base64") : null,
    }));

    res.json({ products: formatted });

  } catch (err) {
    console.error("ADMIN PRODUCTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   GET SINGLE PRODUCT
   =============================== */
router.get("/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    ...product.toObject(),
    image: product.image?.toString("base64"),
  });
});

/* ===============================
   CREATE PRODUCT
   =============================== */
router.post(
  "/create",
  isLogin,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await productModel.create({
        image: req.file?.buffer, // 🔥 safer
        name: req.body.name,
        price: Number(req.body.price),
        discount: Number(req.body.discount || 0),
        bgcolor: req.body.bgcolor,
        panelcolor: req.body.panelcolor,
        textcolor: req.body.textcolor,
        createdBy: req.user._id, // ✅ FIXED
      });

      res.status(201).json(product);
    } catch (err) {
      console.error("CREATE ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;