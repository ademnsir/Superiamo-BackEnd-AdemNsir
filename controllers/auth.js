const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Contrôleur pour l'enregistrement des utilisateurs
exports.register = async (req, res, next) => {
  const { nom, prenom, email, datenaissance, telephone, adresse } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ success: true, message: "Utilisateur déjà enregistré", user: existingUser });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      datenaissance,
      telephone,
      adresse,
    });

    res.status(201).json({ success: true, message: "Utilisateur ajouté avec succès", user });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(400).json({ success: false, message: "Erreur lors de l'ajout de l'utilisateur" });
  }
};

// Contrôleur pour mettre à jour l'utilisateur par email
exports.updateUserByEmail = async (req, res, next) => {
  const { email, nom, prenom, datenaissance, telephone, adresse } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations de l'utilisateur
    existingUser.nom = nom || existingUser.nom;
    existingUser.prenom = prenom || existingUser.prenom;
    existingUser.datenaissance = datenaissance || existingUser.datenaissance;
    existingUser.telephone = telephone || existingUser.telephone;
    existingUser.adresse = adresse || existingUser.adresse;

    await existingUser.save();

    res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès", user: existingUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Contrôleur pour récupérer les informations de l'utilisateur par email
exports.getUserByEmail = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération de l'utilisateur" });
  }
};
