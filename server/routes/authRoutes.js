const express = require("express");
const router = express.Router();
const { login,logout,protect,getme } = require("../controllers/authController");

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

router.get("/getMe",protect,getme)



const bcrypt = require("bcryptjs");
const User = require("../models/UserSchema");

// Register a new user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      // Save user to the database
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  });
  
  
module.exports = router;
