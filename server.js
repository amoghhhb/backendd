import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Player from './models/Player.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.com'],
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, department, email } = req.body;

  if (!name || !department || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const newPlayer = new Player({ name, department, email });
    await newPlayer.save();
    console.log('Saved to MongoDB:', newPlayer);
    res.status(201).json({ success: true, message: 'Data saved to MongoDB' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ success: false, message: 'Server error saving data' });
  }
});

// Optional root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
