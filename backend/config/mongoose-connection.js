const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

const dbURL = process.env.MONGODB_URL || (config.has("MONGODB_URL") ? config.get("MONGODB_URL") : null);

if (!dbURL) {
  console.error("❌ MONGODB_URL is not set. Set process.env.MONGODB_URL or config/MONGODB_URL.");
  throw new Error("MONGODB_URL is not configured");
}

mongoose
  .connect(dbURL)
  .then(function () {
    dbgr("connected");
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    dbgr(err);
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;