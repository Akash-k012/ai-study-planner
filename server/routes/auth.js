const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json("All fields required");
    }

    // STRICT Email Validation
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu)$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json("Please enter a valid email");
    }

    // Password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json("Password must be at least 6 characters");
    }

    // Check existing user
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json("User already exists");
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json(err.message);
  }
});

// Login
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json("All fields required");
    }

    // Email validation
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu)$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json("Please enter a valid email");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      userId: user._id,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json("Login error");
  }
});

// Update profile
router.put("/update", async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json("Update error");
  }
});

// Get user by ID
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json(user);

  } catch (err) {
    res.status(500).json("Server error");
  }
});

module.exports = router;