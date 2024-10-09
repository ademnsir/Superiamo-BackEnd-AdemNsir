const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true },
  githubId: { type: String, unique: true },
  dateNaissance: { type: Date },
  adresse: { type: String },
  numeroTelephone: { type: String, match: /^[0-9]{8}$/ },
  password: { type: String, minlength: 6 },
});

module.exports = mongoose.model("User", UserSchema);
