const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/token");

// USER REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
      authProvider: "Local",
      status: "Active",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.status === "Inactive") {
      return res.status(403).json({ message: "User is inactive" });
    }

    const match = await bcrypt.compare(password, user.password || "");
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login success",
      token: generateToken(user),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN LOGIN (separate)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Create Admin in DB if not exists
    let admin = await User.findOne({ email });

    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email,
        password: "hidden",
        role: "Admin",
        authProvider: "Local",
        status: "Active",
      });
    }

    res.json({
      message: "Admin login success",
      token: generateToken(admin),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, adminLogin };
