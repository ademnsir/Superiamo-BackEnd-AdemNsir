const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const fetch = require("node-fetch"); // Assurez-vous d'installer 'node-fetch'
const authRoutes = require("./routes/auth");

// Charger les variables d'environnement
dotenv.config({ path: "./.env" });

// Vérifier la présence des variables d'environnement
if (!process.env.MONGO_URI) {
  console.error("Erreur : MONGO_URI est introuvable. Vérifiez votre fichier .env.");
}

if (!process.env.PORT) {
  console.error("Erreur : PORT est introuvable. Vérifiez votre fichier .env.");
}

// Connexion à la base de données MongoDB
connectDB();

const app = express();
app.use(express.json());

// Configuration CORS pour les environnements local et déployé
app.use(
  cors({
    origin: ["http://localhost:3000", "https://visionary-starburst-bb6b1f.netlify.app"], // Ajoutez les domaines autorisés
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Fonction pour calculer la distance entre deux points géographiques
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Rayon de la terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en km
};

// Route pour valider l'adresse
app.post("/api/validate-address", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Adresse manquante" });
  }

  try {
    // Obtenir les coordonnées de l'adresse via l'API adresse.data.gouv.fr
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (data.features.length === 0) {
      return res.status(404).json({ error: "Adresse introuvable" });
    }

    const [longitude, latitude] = data.features[0].geometry.coordinates;

    // Coordonnées de Paris
    const parisCoordinates = { latitude: 48.8566, longitude: 2.3522 };

    // Calculer la distance
    const distance = calculateDistance(latitude, longitude, parisCoordinates.latitude, parisCoordinates.longitude);

    if (distance <= 50) {
      res.status(200).json({ message: "Adresse valide, située à moins de 50 km de Paris", distance });
    } else {
      res.status(400).json({ message: `Adresse invalide, située à plus de 50 km de Paris (Distance: ${distance.toFixed(2)} km)` });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'adresse :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Route de base pour vérifier le serveur
app.get("/", (req, res) => {
  res.send("Bonjour le serveur est en marche");
});

// Définir le port et lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
