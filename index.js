import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Player from "./models/Player.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Register user
app.post("/api/register", async (req, res) => {
  const { name, department, email } = req.body;
  try {
    const player = new Player({ name, department, email, answers: [] });
    await player.save();
    res.status(201).json({ success: true, playerId: player._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Submit answer
app.post("/api/submit-answer", async (req, res) => {
  const { playerId, questionId, isCorrect } = req.body;
  try {
    await Player.findByIdAndUpdate(playerId, {
      $push: { answers: { questionId, isCorrect } },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: 1 });

    const leaderboard = players.map((player) => ({
      name: player.name,
      department: player.department,
      correctAnswers: player.answers.filter(a => a.isCorrect).length,
      totalAnswers: player.answers.length
    }));

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
