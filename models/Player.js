import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
