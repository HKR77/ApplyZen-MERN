const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/userModel");
const {
  generateAuthToken,
  generateRefreshToken,
} = require("../middleware/jsonWebToken");

router.get("/auth-verify", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token is valid" }); // Just verify, no data needed
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // Verify refresh token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const token = generateAuthToken(user); // Generate new access token
    const newRefreshToken = generateRefreshToken(user); // Generate new refresh token

    res.json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Profile route error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {

  try {
    const userId = req.body._id;
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
  
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // Return the updated job
      runValidators: true, // Validate the update against the schema
    });

    // console.log(updatedUser);
    

    res.json(updatedUser)
  } catch (err) {
    console.error("Error updating job:", error);

    if (error.name === "CastError") {
      // Handle invalid ObjectId errors
      return res.status(400).json({ message: "Invalid job ID" });
    }

    res.status(500).json({ message: "Server error" });
  }


});

module.exports = router;
