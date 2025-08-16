const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Get all device performance data
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
    
    const devices = await Device.find(query).sort({ revenue: -1 });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new device data
router.post('/', async (req, res) => {
  const device = new Device(req.body);
  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
