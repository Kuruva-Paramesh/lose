import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD .env FROM BACK FOLDER
dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

export default app;
