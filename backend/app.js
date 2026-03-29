const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo").default;

require("dotenv").config();
require("./config/mongoose-connection");

/* ROUTES IMPORT */
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const ordersRouter = require("./routes/ordersRouter");

const app = express();

/* ===============================
TRUST PROXY (IMPORTANT FOR RENDER)
=============================== */
app.set("trust proxy", 1);

/* ===============================
CORS (FIXED)
=============================== */
const allowedOrigins = [
"http://localhost:5173",
"https://bag-verse-ivory.vercel.app", // ✅ no trailing slash
];

app.use(
cors({
origin: function (origin, callback) {
if (!origin) return callback(null, true); // allow Postman / mobile

  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  return callback(null, false);
},
credentials: true,

})
);

/* ===============================
MIDDLEWARE
=============================== */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

/* ===============================
SESSION (PRODUCTION READY)
=============================== */
const isProd = process.env.NODE_ENV === "production";

app.use(
session({
name: "baggista.sid",
secret: process.env.EXPRESS_SESSION_SECRET || "baggista_secret",
resave: false,
saveUninitialized: false,
store: MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  collectionName: "sessions",
}),

cookie: {
  httpOnly: true,
  secure: isProd,               // 🔥 true in production
  sameSite: isProd ? "none" : "lax", // 🔥 required for cross-origin
  maxAge: 1000 * 60 * 60 * 24, // 1 day
},

})
);

/* ===============================
ROUTES
=============================== */
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

/* ===============================
HEALTH CHECK
=============================== */
app.get("/", (req, res) => {
res.json({
status: "Backend running 🚀",
loggedIn: !!req.session.user,
env: process.env.NODE_ENV,
});
});

/* ===============================
SERVER
=============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`✅ Server running on ${PORT}`);
});
