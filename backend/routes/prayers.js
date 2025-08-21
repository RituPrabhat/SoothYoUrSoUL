const express = require('express');
const router = express.Router();
const Prayer = require('../models/Prayers');


// Get all prayers
router.get('/', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.json(prayers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a random prayer
router.get('/random', async (req, res) => {
  try {
    const count = await Prayer.countDocuments();
    const random = Math.floor(Math.random() * count);
    const prayer = await Prayer.findOne().skip(random);
    res.json(prayer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new prayer
router.post('/', async (req, res) => {
  try {
    const { text, meaning } = req.body;
    const newPrayer = new Prayer({ text, meaning });
    await newPrayer.save();
    res.status(201).json(newPrayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
