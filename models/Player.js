const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  score: Number,
  totalQuestions: Number,
  answers: [
    {
      question: String,
      selected: String,
      correct: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Player", playerSchema);
