// controllers/auth.js

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Contrôleur pour l'enregistrement des utilisateurs
exports.registerUser = async (req, res) => {
  const { nom, prenom, email, password, dateNaissance, adresse, numeroTelephone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilisateur déjà enregistré" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      dateNaissance,
      adresse,
      numeroTelephone,
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur", error });
  }
};



// Contrôleur pour la connexion des utilisateurs
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({ message: "Connexion réussie", user });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};

exports.getGoogleUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "L'email est requis." });
  }

  try {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur.", error });
  }
};
exports.getGithubUser = async (req, res) => {
  const { nom, prenom } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({ message: "Le nom et le prénom sont requis pour rechercher un utilisateur GitHub." });
  }

  try {
    const user = await User.findOne({ nom, prenom });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur.", error });
  }
};

// Contrôleur pour mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
  const { email, nom, prenom, dateNaissance, adresse, numeroTelephone } = req.body;

  if (!email) {
    return res.status(400).json({ message: "L'email est requis pour mettre à jour le profil." });
  }

  try {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Mettre à jour les informations de l'utilisateur
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.dateNaissance = dateNaissance || user.dateNaissance;
    user.adresse = adresse || user.adresse;
    user.numeroTelephone = numeroTelephone || user.numeroTelephone;

    // Enregistrer les modifications
    await user.save();

    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil", error });
  }
};
