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
    const products = await productModel.find().sort({ createdAt: -1 });

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
   UPDATE PRODUCT
   =============================== */
router.put("/:id", isLogin, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.discount = req.body.discount !== undefined ? Number(req.body.discount || 0) : product.discount;
    product.bgcolor = req.body.bgcolor ?? product.bgcolor;
    product.panelcolor = req.body.panelcolor ?? product.panelcolor;
    product.textcolor = req.body.textcolor ?? product.textcolor;

    if (req.file?.buffer) {
      product.image = req.file.buffer;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product: {
        ...product.toObject(),
        image: product.image ? product.image.toString("base64") : null,
      },
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   DELETE PRODUCT
   =============================== */
router.delete("/:id", isLogin, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
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