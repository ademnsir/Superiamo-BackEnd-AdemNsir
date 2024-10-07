const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Contrôleur pour l'enregistrement des utilisateurs
exports.registerUser = async (req, res) => {
  const { nom, prenom, email, password, dateNaissance, adresse, numeroTelephone } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilisateur déjà enregistré" });
    }

    // Créer un nouvel utilisateur avec le mot de passe haché
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

    // Sauvegarder l'utilisateur dans la base de données
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
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer les mots de passe
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
