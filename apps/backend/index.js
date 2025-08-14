// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./project.js"; // Fixed import path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional: Parse URL-encoded data

/* -------------------- ROUTES -------------------- */
app.use("/api", projectRoutes); // All routes from project.routes.js under /api

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server running 🚀" });
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});