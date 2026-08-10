const express = require("express");
const router = express.Router();
const isLogin = require("../middlewares/isLogin");
const Order = require("../models/order.models");
const Owner = require("../models/owners.models");
const PDFDocument = require("pdfkit");
const { sendSms } = require("../utils/smsService");

const isSmsEnabled =
  !!process.env.TWILIO_ACCOUNT_SID &&
  !!process.env.TWILIO_AUTH_TOKEN &&
  !!process.env.TWILIO_PHONE_NUMBER;

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

    const owner = await Owner.findOne().sort({ createdAt: -1 });

    if (owner && owner.phone && isSmsEnabled) {
      const customerName = shippingAddress.fullname || "Customer";
      const customerAddress = [
        shippingAddress.address,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.pincode,
      ]
        .filter(Boolean)
        .join(", ");

      const messageBody = `New order placed by ${customerName}. Delivery address: ${customerAddress}. Contact: ${shippingAddress.phone}. Total: ₹${totalAmount}.`;

      await sendSms(owner.phone, messageBody);
    } else {
      console.info("SMS notification skipped because Twilio is not configured.");
    }

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
   GET ADMIN ORDERS
   GET /api/orders/admin
   =============================== */
router.get("/admin", isLogin, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Fetch admin orders error:", error);
    res.status(500).json({ message: "Failed to fetch admin orders" });
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
   ACCEPT ORDER
   PUT /api/orders/:id/accept
   =============================== */
router.put("/:id/accept", isLogin, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { deliveryDate } = req.body;
    if (!deliveryDate) {
      return res.status(400).json({ message: "Delivery date is required" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Accepted";
    order.deliveryDate = new Date(deliveryDate);
    await order.save();

    res.status(200).json({ message: "Order accepted", order });
  } catch (error) {
    console.error("Accept order error:", error);
    res.status(500).json({ message: "Failed to accept order" });
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
