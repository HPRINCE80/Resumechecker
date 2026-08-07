
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

async function connectToDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/airesume";

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.warn("Continuing without a database connection."
    );
  }
}

module.exports = connectToDB;