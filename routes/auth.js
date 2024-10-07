const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, getGoogleUser } = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile);

// Nouvelle route pour récupérer l'utilisateur par Google ID ou email
router.post("/google-user", getGoogleUser);

module.exports = router;
