const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, getGoogleUser } = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Nouvelle route pour récupérer les informations d'un utilisateur via son email (Google)
router.post("/google-user", getGoogleUser);

// Nouvelle route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile);

module.exports = router;
