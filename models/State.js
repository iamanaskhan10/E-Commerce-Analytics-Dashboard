const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('State', stateSchema);
