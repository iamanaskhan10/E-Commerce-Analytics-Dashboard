// src/components/Loader.js
import React from 'react';
import './Loader.css'; // We'll create this next

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading dashboard data...</p>
    </div>
  );
};

export default Loader;