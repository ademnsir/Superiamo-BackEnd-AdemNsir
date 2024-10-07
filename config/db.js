const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion : ${error.message}`);
    process.exit(1); // Arrêtez le serveur si la connexion échoue
  }
};

module.exports = connectDB;
