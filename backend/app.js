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
   🔥 TRUST PROXY (CRITICAL FIX)
   =============================== */
app.set("trust proxy", 1);

/* ===============================
   CORS
   =============================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://bag-verse-sable.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 🔥 DO NOT THROW ERROR
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
   SESSION
   =============================== */
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
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24,
},
  })
);

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
    status: "Backend running 🚀",
    loggedIn: !!req.session.user,
  });
});

/* ===============================
   SERVER
   =============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});