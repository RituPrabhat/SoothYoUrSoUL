const express = require('express');
const router = express.Router();
const Story = require('../models/Stories');


// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a random story
router.get('/random', async (req, res) => {
  try {
    const count = await Story.countDocuments();
    const random = Math.floor(Math.random() * count);
    const story = await Story.findOne().skip(random);
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new story
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newStory = new Story({ title, content, author });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
