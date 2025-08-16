const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const KPI = require('../models/KPI');
const RevenueOverTime = require('../models/RevenueOverTime');
const Product = require('../models/Product');
const Marketing = require('../models/Marketing');
const State = require('../models/State');
const Device = require('../models/Device');

// Sample data
const sampleData = {
  kpis: {
    ecommerceRevenue: 268277,
    newCustomers: 198,
    repeatPurchaseRate: 67.54,
    averageOrderValue: 402.21,
    ecommerceConversionRate: 1.27
  },
  revenueOverTime: [
    { date: "2020-02-01", revenue: 5000, conversionRate: 0.06 },
    { date: "2020-02-08", revenue: 8500, conversionRate: 0.08 },
    { date: "2020-02-15", revenue: 12000, conversionRate: 0.07 },
    { date: "2020-02-22", revenue: 18000, conversionRate: 0.12 },
    { date: "2020-03-01", revenue: 15000, conversionRate: 0.10 },
    { date: "2020-03-08", revenue: 23000, conversionRate: 0.15 },
    { date: "2020-03-15", revenue: 17000, conversionRate: 0.11 },
    { date: "2020-03-22", revenue: 14000, conversionRate: 0.09 },
    { date: "2020-03-29", revenue: 25000, conversionRate: 0.13 },
    { date: "2020-04-05", revenue: 20000, conversionRate: 0.11 }
  ],
  productPerformance: [
    { product: "Product 1", revenue: 29503, conversionRate: 1.53 },
    { product: "Product 2", revenue: 67557, conversionRate: 1.47 },
    { product: "Product 3", revenue: 30869, conversionRate: 1.53 },
    { product: "Product 4", revenue: 40404, conversionRate: 1.46 },
    { product: "Product 5", revenue: 99944, conversionRate: 1.42 }
  ],
  marketingChannels: [
    { channel: "AdRoll", revenue: 56115, conversionRate: 1.45 },
    { channel: "LinkedIn Ads", revenue: 53221, conversionRate: 1.53 },
    { channel: "YouTube Ads", revenue: 47870, conversionRate: 1.45 },
    { channel: "Bing Ads", revenue: 38219, conversionRate: 1.54 },
    { channel: "Google Ads", revenue: 37643, conversionRate: 1.45 },
    { channel: "Facebook Ads", revenue: 35128, conversionRate: 1.47 }
  ],
  statePerformance: [
    { state: "California", revenue: 72000 },
    { state: "Texas", revenue: 55000 },
    { state: "Florida", revenue: 48000 },
    { state: "New York", revenue: 61000 },
    { state: "Illinois", revenue: 32000 },
    { state: "Pennsylvania", revenue: 25000 }
  ],
  devicePerformance: [
    { device: "Desktop", revenue: 118971, conversionRate: 1.47 },
    { device: "Mobile", revenue: 59041, conversionRate: 1.37 },
    { device: "Tablet", revenue: 89905, conversionRate: 1.58 }
  ]
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Seed function
async function seedData() {
  try {
    // Clear existing data
    await KPI.deleteMany({});
    await RevenueOverTime.deleteMany({});
    await Product.deleteMany({});
    await Marketing.deleteMany({});
    await State.deleteMany({});
    await Device.deleteMany({});

    console.log('Cleared existing data');

    // Seed KPIs
    await KPI.create(sampleData.kpis);
    console.log('Seeded KPIs');

    // Seed Revenue Over Time
    const revenueData = sampleData.revenueOverTime.map(item => ({
      ...item,
      date: new Date(item.date),
      breakdown: 'weekly'
    }));
    await RevenueOverTime.create(revenueData);
    console.log('Seeded Revenue Over Time');

    // Seed Products
    await Product.create(sampleData.productPerformance);
    console.log('Seeded Products');

    // Seed Marketing
    await Marketing.create(sampleData.marketingChannels);
    console.log('Seeded Marketing');

    // Seed States
    await State.create(sampleData.statePerformance);
    console.log('Seeded States');

    // Seed Devices
    await Device.create(sampleData.devicePerformance);
    console.log('Seeded Devices');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
