const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
},
{ timestamps: true } 
);

module.exports = mongoose.model("Owner", ownerSchema);
