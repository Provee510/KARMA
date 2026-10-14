import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";




const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "KARMA API is running.",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file.");
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be at least 32 characters long.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("KARMA connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`KARMA API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start KARMA API:", error.message);
    process.exit(1);
  }
};

startServer();
