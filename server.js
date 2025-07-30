import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS setup: allow frontend domain
app.use(cors({
  origin: ['http://localhost:5173', 'https://round1-frontend.vercel.app'], // <-- put your actual frontend URL here
}));
app.use(express.json());

// ✅ Route for handling form submission
app.post('/submit', (req, res) => {
  const { name, department, email } = req.body;

  if (!name || !department || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  console.log('Received submission:', { name, department, email });

  res.status(201).json({ success: true, message: 'Submission received' });
});

// Optional: test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
