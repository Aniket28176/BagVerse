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

app.set("trust proxy", 1);

/* CORS */
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

/* MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());

/* SESSION */
app.use(
  session({
    name: "baggista.sid",
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

/* ROUTES */
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter); // ✅ FIX
app.use("/api/cart", cartRouter);         // ✅ FIX
app.use("/api/orders", ordersRouter);     // ✅ FIX

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({
    status: "Backend running 🚀",
    loggedIn: !!req.session.user,
  });
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on 5000 🚀");
});