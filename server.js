const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Import routes
const kpiRoutes = require('./routes/kpis');
const revenueRoutes = require('./routes/revenue');
const productRoutes = require('./routes/products');
const marketingRoutes = require('./routes/marketing');
const stateRoutes = require('./routes/states');
const deviceRoutes = require('./routes/devices');

// API Routes
app.use('/api/kpis', kpiRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/products', productRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/devices', deviceRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
