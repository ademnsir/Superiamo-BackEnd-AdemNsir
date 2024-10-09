const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Importer les routes d'authentification
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
