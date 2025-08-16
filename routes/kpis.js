const express = require('express');
const router = express.Router();
const KPI = require('../models/KPI');

// Get all KPIs
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
    
    const kpis = await KPI.find(query).sort({ createdAt: -1 }).limit(1);
    res.json(kpis[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new KPI data
router.post('/', async (req, res) => {
  const kpi = new KPI(req.body);
  try {
    const newKPI = await kpi.save();
    res.status(201).json(newKPI);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
