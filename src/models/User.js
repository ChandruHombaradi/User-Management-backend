const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    authProvider: { type: String, enum: ["Local", "Google"], default: "Local" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
