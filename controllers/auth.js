const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { nom, prenom, email, password, dateNaissance, adresse, numeroTelephone } = req.body;

  try {
    // Vérifiez que l'email est présent
    if (!email) {
      return res.status(400).json({ message: "L'email est requis pour l'enregistrement." });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({ message: "Utilisateur déjà enregistré", user: userExists });
    }

    // Utiliser un mot de passe par défaut si non fourni (uniquement pour Google)
    const defaultPassword = password || "default_password"; // Définir un mot de passe par défaut

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Créer le nouvel utilisateur
    const newUser = new User({
      nom: nom || "Nom par défaut",
      prenom: prenom || "Prénom par défaut",
      email,
      password: hashedPassword,
      dateNaissance,
      adresse,
      numeroTelephone,
    });

    await newUser.save();

    console.log("Utilisateur enregistré avec succès :", newUser);
    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur", error: error.message });
  }
};

exports.getGoogleUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user.", error });
  }
};

exports.updateProfile = async (req, res) => {
  const { email, nom, prenom, dateNaissance, adresse, numeroTelephone } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.dateNaissance = dateNaissance || user.dateNaissance;
    user.adresse = adresse || user.adresse;
    user.numeroTelephone = numeroTelephone || user.numeroTelephone;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile.", error });
  }
};
