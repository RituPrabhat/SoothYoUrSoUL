const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');


// Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a random quote
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new quote
router.post('/', async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = new Quote({ text, author });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
