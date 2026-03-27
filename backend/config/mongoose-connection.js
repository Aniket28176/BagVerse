const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

const dbURI = process.env.MONGODB_URI || (config.has("MONGODB_URI") ? config.get("MONGODB_URI") : null);

if (!dbURI) {
  console.error("❌ MONGODB_URI is not set. Set process.env.MONGODB_URI or config/MONGODB_URI.");
  throw new Error("MONGODB_URI is not configured");
}

mongoose
  .connect(dbURI)
  .then(function () {
    dbgr("connected");
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    dbgr(err);
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;