const express = require('express');
const router = express.Router();
const State = require('../models/State');

// Get all state performance data
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const states = await State.find(query).sort({ revenue: -1 });
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new state data
router.post('/', async (req, res) => {
  const state = new State(req.body);
  try {
    const newState = await state.save();
    res.status(201).json(newState);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
