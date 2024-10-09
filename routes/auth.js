const express = require("express");
const router = express.Router();
const { registerUser, getGoogleUser, updateProfile } = require("../controllers/auth");

router.post("/register", registerUser);
router.post("/google-user", getGoogleUser);
router.put("/update-profile", updateProfile);

module.exports = router;
