const express = require("express");
const router = express.Router();
const { register, updateUserByEmail, getUserByEmail } = require("../controllers/auth");

// Route pour créer un utilisateur lors de la connexion initiale (Google/GitHub)
router.post("/register", register);

// Route pour mettre à jour le profil d'un utilisateur
router.post("/update", updateUserByEmail);

// Route pour récupérer les informations de l'utilisateur par email
router.get("/getuser", getUserByEmail);

module.exports = router;
