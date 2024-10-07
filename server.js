const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });

if (!process.env.MONGO_URI) {
  console.error("Erreur : MONGO_URI est introuvable. Vérifiez votre fichier .env.");
}

if (!process.env.PORT) {
  console.error("Erreur : PORT est introuvable. Vérifiez votre fichier .env.");
}

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Bonjour le serveur est en marche");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
