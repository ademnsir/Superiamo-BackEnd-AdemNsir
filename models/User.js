const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String, // Champ ajouté pour stocker l'ID Google
    unique: true,
  },
  dateNaissance: {
    type: Date,
  },
  adresse: {
    type: String,
  },
  numeroTelephone: {
    type: String,
    match: /^[0-9]{10}$/, // Doit correspondre à un numéro de téléphone à 10 chiffres
  },
  password: {
    type: String,
    minlength: 6,
  },
});

module.exports = mongoose.model("User", UserSchema);
