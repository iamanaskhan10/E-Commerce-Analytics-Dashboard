const express = require('express');
const router = express.Router();
const Marketing = require('../models/Marketing');

// Get all marketing channel data
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
    
    const marketing = await Marketing.find(query).sort({ revenue: -1 });
    res.json(marketing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new marketing data
router.post('/', async (req, res) => {
  const marketing = new Marketing(req.body);
  try {
    const newMarketing = await marketing.save();
    res.status(201).json(newMarketing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
