import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: String,
  isCorrect: Boolean,
});

const PlayerSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  answers: [AnswerSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Player", PlayerSchema);
