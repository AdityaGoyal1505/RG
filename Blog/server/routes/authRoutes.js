const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register route (use only once to create admin user)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(400).json({ error: "User exists or invalid data" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;
