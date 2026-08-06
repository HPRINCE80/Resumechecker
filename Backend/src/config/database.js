
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

async function connectToDB() {
//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI is missing. Add it to Backend/.env");
//   }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectToDB;