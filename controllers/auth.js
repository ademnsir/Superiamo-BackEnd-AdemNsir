const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { nom, prenom, email, password, dateNaissance, adresse, numeroTelephone, googleId, githubId } = req.body;

  try {
    if (!nom || !prenom || !email) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({ message: "User already exists.", user: userExists });
    }

    const newUser = new User({
      nom,
      prenom,
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      dateNaissance,
      adresse,
      numeroTelephone,
      googleId,
      githubId,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
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
