const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth"); // Import correct des contrôleurs

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

module.exports = router;
