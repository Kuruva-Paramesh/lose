import express from "express";
import User from "../models/User.js";

const router = express.Router();

// create user
router.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// get users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
