const bcrypt = require("bcryptjs");
const User = require("../models/User");

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "User",
      authProvider: "Local",
      status: "Active",
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET SINGLE USER
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// UPDATE USER
const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");

  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User updated", updated });
};

// DELETE USER
const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

// ACTIVATE / DEACTIVATE
const toggleStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = user.status === "Active" ? "Inactive" : "Active";
  await user.save();

  res.json({ message: "Status updated", status: user.status });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleStatus,
};
