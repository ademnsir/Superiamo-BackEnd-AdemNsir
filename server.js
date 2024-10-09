const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./.env" });

// Check environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI not found. Check your .env file.");
}

if (!process.env.PORT) {
  console.error("Error: PORT not found. Check your .env file.");
}

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://visionary-starburst-bb6b1f.netlify.app", credentials: true }));

// Import authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
