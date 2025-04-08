const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists 🚫" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: " User registered successfully 📝"})
  } catch (error) {
    res.status(500).json({ error: "Couldn't register user ❌", details: error.message})
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials"})
    }

    const userObj = user.toObject();
    const token = jwt.sign(userObj, JWT_SECRET, { expiresIn: "1hr" });

    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ error:"Server error", details: error.message });
  }
});

module.exports = router;
