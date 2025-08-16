const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
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

module.exports = mongoose.model('Product', productSchema);
