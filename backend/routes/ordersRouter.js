const express = require("express");
const router = express.Router();
const isLogin = require("../middlewares/isLogin");
const Order = require("../models/order.models");
const PDFDocument = require("pdfkit");

/* ===============================
   CREATE ORDER
   POST /api/orders/create
   =============================== */
router.post("/create", isLogin, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot place orders" });
    }

    const { products, totalAmount, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

/* ===============================
   GET USER ORDERS
   GET /api/orders/my
   =============================== */
router.get("/my", isLogin, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(200).json([]);
    }

    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   DOWNLOAD INVOICE (PDF)
   GET /api/orders/invoice/:id
   =============================== */
router.get("/invoice/:id", isLogin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Security check
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    /* ---------- HEADER ---------- */
    doc.fontSize(22).text("Baggista - Order Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Order Date: ${order.createdAt.toDateString()}`);
    doc.text(`Status: ${order.status}`);
    doc.moveDown();

    /* ---------- SHIPPING ADDRESS ---------- */
    doc.fontSize(14).text("Shipping Address");
    doc.moveDown(0.5);
    doc.fontSize(12);

    if (order.shippingAddress) {
      const a = order.shippingAddress;
      doc.text(a.fullname || "");
      doc.text(a.email || "");
      doc.text(a.phone || "");
      doc.text(a.address || "");
      doc.text(`${a.city || ""} ${a.state || ""}`);
      doc.text(a.pincode || "");
    }

    doc.moveDown();

    /* ---------- PRODUCTS ---------- */
    doc.fontSize(14).text("Order Items");
    doc.moveDown(0.5);
    doc.fontSize(12);

    order.products.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} × ${item.quantity} — ₹${
          item.price * item.quantity
        }`
      );
    });

    doc.moveDown();

    /* ---------- TOTAL ---------- */
    doc.fontSize(14).text(`Total Amount: ₹ ${order.totalAmount}`, {
      align: "right",
    });

    doc.end();
  } catch (error) {
    console.error("Invoice error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
});

module.exports = router;
