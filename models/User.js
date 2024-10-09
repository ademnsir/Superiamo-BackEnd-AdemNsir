const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: false, default: "" },
  prenom: { type: String, required: false, default: "" },
  email: { type: String, required: true, unique: true },
  datenaissance: { type: String, required: false, default: "" },
  telephone: { type: String, required: false, default: "" },
  adresse: { type: String, required: false, default: "" },
});

module.exports = mongoose.model("User", UserSchema);
