const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// Register player
router.post("/register", async (req, res) => {
  try {
    const { name, department, email } = req.body;
    const player = new Player({ name, department, email, score: 0, totalQuestions: 0, answers: [] });
    await player.save();
    res.status(201).json({ message: "Player registered", playerId: player._id });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Submit answers and score
router.post("/submit", async (req, res) => {
  try {
    const { playerId, answers, score, totalQuestions } = req.body;
    await Player.findByIdAndUpdate(playerId, {
      answers,
      score,
      totalQuestions,
    });
    res.status(200).json({ message: "Submission saved" });
  } catch (err) {
    res.status(500).json({ error: "Submit failed" });
  }
});

// Get leaderboard
router.get("/players", async (req, res) => {
  try {
    const players = await Player.find({}, { email: 0, answers: 0 }); // hide email + answers
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

module.exports = router;
