const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, getGoogleOrGithubUser } = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Route pour récupérer les informations d'un utilisateur via son email (Google ou GitHub)
router.post("/oauth-user", getGoogleOrGithubUser);

// Route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile);

module.exports = router;
