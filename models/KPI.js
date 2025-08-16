const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
  ecommerceRevenue: {
    type: Number,
    required: true
  },
  newCustomers: {
    type: Number,
    required: true
  },
  repeatPurchaseRate: {
    type: Number,
    required: true
  },
  averageOrderValue: {
    type: Number,
    required: true
  },
  ecommerceConversionRate: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    default: 'current'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('KPI', kpiSchema);
