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
    type: String, // New field to store Google ID
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
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
