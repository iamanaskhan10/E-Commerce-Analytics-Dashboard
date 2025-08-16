const mongoose = require('mongoose');

const marketingSchema = new mongoose.Schema({
  channel: {
    type: String,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  conversionRate: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Marketing', marketingSchema);
