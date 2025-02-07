const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const hashPassword = require("../middleware/hashing");
const bcrypt = require("bcrypt"); // For password comparison
const {generateAuthToken, generateRefreshToken} = require("../middleware/jsonWebToken");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // check if the user already exists
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered. Please log in." });
    }

    // hash the password.
    const hashedPassword = await hashPassword(password);

    // create new user.
    const newUser = User({ ...req.body, password: hashedPassword });

    // Save the user.
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user.
    const user = await User.findOne({ email });

    // check if the user exists.
    if (!user) {
      return res.status(400).json({ message: "Email dosen't exist" });
    }

    // validate password.
    const isMatch = await bcrypt.compare(password, user.password);

    // take action according to the validation.
    if (isMatch) {

      // 5. Create and send a JWT (JSON Web Token) for authentication (Important!)
      const token = generateAuthToken(user); // See function below
      const refreshToken = generateRefreshToken(user);

      res.json({ token, refreshToken }); // Send the token to the client

    } else {      
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", authMiddleware, (req, res) => {
  // Access user information from req.user (set by the middleware):
  res.json({ user: req.user });
});

module.exports = router;
