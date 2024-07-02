const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors') //cors

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const sheetMusicSchema = new mongoose.Schema({
  title: String,
  composer: String,
  price: Number,
});

const SheetMusic = mongoose.model('SheetMusic', sheetMusicSchema);

app.get('/api/sheetmusic', async (req, res) => {
  const items = await SheetMusic.find();
  res.json(items);
});

app.post('/api/sheetmusic', async (req, res) => {
  const newItem = new SheetMusic(req.body);
  const savedItem = await newItem.save();
  res.json(savedItem);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
