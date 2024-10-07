const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Importer cors
const connectDB = require("./config/db");

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: "./.env" });

// Vérifier le chargement des variables d'environnement
console.log("MONGO_URI depuis le fichier .env :", process.env.MONGO_URI);
console.log("PORT depuis le fichier .env :", process.env.PORT);

if (!process.env.MONGO_URI) {
  console.error("Erreur : MONGO_URI est introuvable. Vérifiez votre fichier .env.");
}

if (!process.env.PORT) {
  console.error("Erreur : PORT est introuvable. Vérifiez votre fichier .env.");
}

// Connecter à la base de données
connectDB();

const app = express();
app.use(express.json());

// Configurer CORS pour autoriser les requêtes du frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Remplacez par l'URL de votre frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Importer les routes d'authentification
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
