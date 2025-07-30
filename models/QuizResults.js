// models/QuizResult.js
import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // primary key
  name: String,
  department: String,
  correct: Number,
  incorrect: Number,
  percentage: Number,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuizResult", quizResultSchema);
