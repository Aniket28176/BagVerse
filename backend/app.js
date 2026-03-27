const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo").default;

require("dotenv").config();
require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const ordersRouter = require("./routes/ordersRouter");

const app = express();

/* ===============================
   CORS (ALLOW ALL ORIGINS SAFELY)
   =============================== */
const corsOptions = {
  origin: true, // 🔥 allow all origins dynamically
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 handle preflight

/* ===============================
   MIDDLEWARE
   =============================== */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

/* ===============================
   SESSION
   =============================== */
app.use(
  session({
    name: "baggista.sid",
    secret: process.env.EXPRESS_SESSION_SECRET || "baggista_secret",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),

    cookie: {
      httpOnly: true,
      sameSite: "none", // 🔥 required for cross-origin
      secure: true,     // 🔥 required (HTTPS)
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/* ===============================
   STATIC
   =============================== */
app.use(express.static(path.join(__dirname, "public")));

/* ===============================
   ROUTES
   =============================== */
app.use("/api/owners", ownersRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.json({
    status: "Backend running successfully 🚀",
    loggedIn: !!req.session.user,
  });
});

/* ===============================
   ERROR HANDLER (FIXED CORS)
   =============================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  // 🔥 ensure CORS headers even on error
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

/* ===============================
   SERVER
   =============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});