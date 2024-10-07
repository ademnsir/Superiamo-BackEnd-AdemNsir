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
  password: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("User", UserSchema);
