const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require("../controllers/auth"); // Importer updateProfile

// Route pour créer un utilisateur
router.post("/register", registerUser);

// Route pour connecter un utilisateur
router.post("/login", loginUser);

// Route pour mettre à jour le profil utilisateur
router.put("/update-profile", updateProfile); // Route pour la mise à jour du profil

module.exports = router;
