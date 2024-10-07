const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, getGoogleUser, getGithubUser } = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Route pour récupérer les informations d'un utilisateur via son email (Google)
router.post("/google-user", getGoogleUser);

// Route pour récupérer les informations d'un utilisateur via son nom et prénom (GitHub)
router.post("/github-user", getGithubUser);

// Route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile);

module.exports = router;
