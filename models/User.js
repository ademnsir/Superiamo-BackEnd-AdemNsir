const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: false,
  },
  prenom: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true, // L'email doit être unique
  },
  password: {
    type: String,
    required: false, // Non requis pour les utilisateurs de Google/GitHub
  },
  googleId: {
    type: String, // Champ pour stocker l'ID Google
    unique: true,
    sparse: true, // Uniquement si fourni
  },
  githubId: {
    type: String, // Champ pour stocker l'ID GitHub
    unique: true,
    sparse: true,
  },
  provider: {
    type: String,
    enum: ["google", "github", "local"], // Indique le type de provider
    default: "local",
  },
  datenaissance: {
    type: Date,
    required: false,
  },
  telephone: {
    type: String,
    match: /^[0-9]{8}$/, // Doit correspondre à un numéro de téléphone à 8 chiffres
    required: false,
  },
  adresse: {
    type: String,
    required: false,
  },
});

// Hook avant la sauvegarde pour générer un identifiant unique si nécessaire
UserSchema.pre("save", async function (next) {
  try {
    if (!this.id) {
      const count = await mongoose.model("User").countDocuments();
      this.id = count + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
