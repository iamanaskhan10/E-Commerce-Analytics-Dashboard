import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, fetchRevenueOverTime } from '../store/dashboardSlice';
import { FaPen } from 'react-icons/fa';
import './Header.css';

const Header = ({ localFilters, setLocalFilters, handleKeyDown, handleComparisonChange }) => {
  const dispatch = useDispatch();

  // Use props from App.js instead of local state
  const { startDate, endDate, comparisonPeriod } = localFilters;

  // Convert MM/DD/YYYY to ISO format for API
  const convertToISO = (dateString) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    if (month && day && year) {
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      const yearNum = parseInt(year, 10);
      
      // Validate date
      if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31 && yearNum >= 1900 && yearNum <= 2100) {
        return `${yearNum}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    return '';
  };

  // Handle start date change
  const handleStartDateChange = (e) => {
    setLocalFilters({ ...localFilters, startDate: e.target.value });
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    setLocalFilters({ ...localFilters, endDate: e.target.value });
  };

  return (
    <header className="dashboard-header">
      {/* Left: Pen icon + title */}
      <div className="header-left">
        <FaPen style={{ marginRight: '8px', color: '#175582' }} />
        <span className="ecommerce-name">
          PenPath <span className="dashboard-subtitle">| Ecommerce Performance Overview</span>
        </span>
      </div>

      {/* Right: Filters */}
      <div className="header-middle filters-container">
        <div className="filter-field">
          <label>Start Date</label>
          <input
            type="text"
            value={startDate}
            onChange={handleStartDateChange}
            onKeyDown={handleKeyDown}
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div className="filter-field">
          <label>End Date</label>
          <input
            type="text"
            value={endDate}
            onChange={handleEndDateChange}
            onKeyDown={handleKeyDown}
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div className="filter-field">
          <label>Comparison Period</label>
          <select value={comparisonPeriod} onChange={handleComparisonChange}>
            <option value="Previous Year">Previous Year</option>
            <option value="All Time">All Time</option>
          </select>
        </div>

        <button className="view-dashboard-btn">View All Dashboards</button>
      </div>
    </header>
  );
};

export default Header;
