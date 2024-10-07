const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getGoogleUser, updateUserProfile } = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Route pour récupérer l'utilisateur Google par email
router.post("/google-user", getGoogleUser);

// Route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile);

module.exports = router;
