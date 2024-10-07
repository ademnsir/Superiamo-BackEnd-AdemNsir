const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getGoogleUser, updateUserProfile } = require("../controllers/auth");

// Route for registering a new user
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for retrieving user details using Google ID
router.post("/google-user", getGoogleUser);

// Route for updating user profile
router.put("/update-profile", updateUserProfile);

module.exports = router;
