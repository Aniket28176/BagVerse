const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.models");
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
router.get("/admin", isAdmin, async (req, res) => {
  const products = await productModel.find({
    createdBy: req.admin._id,
  });

  const formatted = products.map((p) => ({
    ...p.toObject(),
    image: p.image ? p.image.toString("base64") : null,
  }));

  res.json({ products: formatted });
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
  });

  res.status(201).json(product);
});

module.exports = router;