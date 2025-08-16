const express = require('express');
const router = express.Router();
const RevenueOverTime = require('../models/RevenueOverTime');

// map UI value -> $dateTrunc unit
const unitMap = { daily: 'day', weekly: 'week', monthly: 'month' };

// Parse query date that may be "YYYY-MM-DD" or full ISO
function parseStart(isoLike) {
  if (!isoLike) return null;
  const d = new Date(isoLike);            // works for both forms
  if (isNaN(d)) return null;
  // force to start of day UTC
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
}
function parseEnd(isoLike) {
  if (!isoLike) return null;
  const d = new Date(isoLike);
  if (isNaN(d)) return null;
  // force to end of day UTC (inclusive)
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999));
}

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, breakdown = 'weekly' } = req.query;

    const start = parseStart(startDate);
    const end   = parseEnd(endDate);
    const unit  = unitMap[breakdown] || 'week';

    // 1) Row-level match (inclusive)
    const match = {};
    if (start || end) {
      match.date = {};
      if (start) match.date.$gte = start;
      if (end)   match.date.$lte = end;
    }

    // 2) Compute bucket start for each row
    // 3) Bucket-level match (so labels don’t drift outside the range)
    const bucketMatch = {};
    if (start || end) {
      // compute start/end bucket boundaries using the SAME unit
      const startBucket = start
        ? await RevenueOverTime.aggregate([
            { $limit: 1 },
            { $project: { b: { $dateTrunc: { date: start, unit, timezone: 'UTC' } } } },
          ]).then(r => r[0]?.b)
        : null;

      const endBucket = end
        ? await RevenueOverTime.aggregate([
            { $limit: 1 },
            { $project: { b: { $dateTrunc: { date: end, unit, timezone: 'UTC' } } } },
          ]).then(r => r[0]?.b)
        : null;

      if (startBucket || endBucket) {
        bucketMatch.bucket = {};
        if (startBucket) bucketMatch.bucket.$gte = startBucket;
        if (endBucket)   bucketMatch.bucket.$lte = endBucket;
      }
    }

    const pipeline = [
      Object.keys(match).length ? { $match: match } : null,
      { $addFields: { bucket: { $dateTrunc: { date: '$date', unit, timezone: 'UTC' } } } },
      Object.keys(bucketMatch).length ? { $match: bucketMatch } : null,
      {
        $group: {
          _id: '$bucket',
          revenue: { $sum: '$revenue' },
          // change to weighted formula if you have numerators/denominators
          conversionRate: { $avg: '$conversionRate' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: { $dateToString: { date: '$_id', format: '%Y-%m-%d', timezone: 'UTC' } },
          revenue: 1,
          conversionRate: 1,
        },
      },
    ].filter(Boolean);

    const rows = await RevenueOverTime.aggregate(pipeline);
    res.json(rows);
  } catch (err) {
    console.error('[GET /api/revenue] error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
