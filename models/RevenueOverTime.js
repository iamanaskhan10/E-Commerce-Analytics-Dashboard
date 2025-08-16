const mongoose = require('mongoose');

const revenueOverTimeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  conversionRate: {
    type: Number,
    required: true
  },
  breakdown: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'weekly'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RevenueOverTime', revenueOverTimeSchema);
