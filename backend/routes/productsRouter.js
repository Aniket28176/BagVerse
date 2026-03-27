const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.models");
const isAdmin = require("../middlewares/isAdmin");

/* ======================================================
   GET ALL PRODUCTS (PUBLIC)
   ====================================================== */
router.get("/", async (req, res) => {
  // allow optional sort and search query parameters
  const { sort, search } = req.query;

  const query = {};
  if (search) {
    // simple case-insensitive substring match on name
    query.name = { $regex: search, $options: "i" };
  }

  // determine sort order
  let sortObj = { createdAt: -1 }; // default newest first
  if (sort) {
    switch (sort) {
      case "popular":
        sortObj = { salesCount: -1 };
        break;
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "priceLow":
        sortObj = { price: 1 };
        break;
      case "priceHigh":
        sortObj = { price: -1 };
        break;
      default:
        break;
    }
  }

  const products = await productModel.find(query).sort(sortObj);

  const productsWithImages = products.map((p) => ({
    ...p.toObject(),
    image: p.image ? p.image.toString("base64") : null,
  }));

  res.json({ products: productsWithImages });
});

/* ======================================================
   GET SINGLE PRODUCT BY ID
   GET /api/products/:id
   ====================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productWithImage = {
      ...product.toObject(),
      image: product.image ? product.image.toString("base64") : null,
    };

    res.json(productWithImage);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

/* ======================================================
   GET ADMIN PRODUCTS
   GET /api/products/admin
   ====================================================== */
router.get("/admin", isAdmin, async (req, res) => {
  const products = await productModel.find({
    createdBy: req.admin._id,
  });

  const productsWithImages = products.map((p) => ({
    ...p.toObject(),
    image: p.image ? p.image.toString("base64") : null,
  }));

  res.json({ products: productsWithImages });
});

/* ======================================================
   CREATE PRODUCT (ADMIN ONLY)
   ====================================================== */
router.post("/create", isAdmin, upload.single("image"), async (req, res) => {
  const product = await productModel.create({
    image: req.file.buffer,
    name: req.body.name,
    price: Number(req.body.price),
    discount: Number(req.body.discount || 0),
    bgcolor: req.body.bgcolor,
    panelcolor: req.body.panelcolor,
    textcolor: req.body.textcolor,
    createdBy: req.admin._id,
    salesCount: 0,
  });

  res.status(201).json({ message: "Product added", product });
});

module.exports = router;
