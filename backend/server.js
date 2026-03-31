import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";

// Load env variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname (ESM fix)
const __dirname = path.resolve();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/todos", todoRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
  // Serve static frontend
  app.use(express.static(path.join(__dirname, "frontent", "dist")));

  // Catch-all (Express 5 safe)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontent", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});