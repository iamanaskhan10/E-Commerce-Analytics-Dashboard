import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchRevenueOverTime } from './store/dashboardSlice';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.dashboard);

  const [localFilters, setLocalFilters] = useState({
    startDate: filters.startDate || '',
    endDate: filters.endDate || '',
    comparisonPeriod: filters.comparisonPeriod || 'Previous Year'
  });

  // Sync local state with global filters
  useEffect(() => {
    setLocalFilters({
      startDate: filters.startDate || '',
      endDate: filters.endDate || '',
      comparisonPeriod: filters.comparisonPeriod || 'Previous Year'
    });
  }, [filters]);

  // Comparison period dropdown - only affects RevenueOverTime
  const handleComparisonChange = (e) => {
    const updatedFilters = { ...localFilters, comparisonPeriod: e.target.value };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));

    // Only update RevenueOverTime if dates are set
    if (localFilters.startDate && localFilters.endDate) {
      // Convert dates to ISO format
      const startISO = convertToISO(localFilters.startDate);
      const endISO = convertToISO(localFilters.endDate);
      
      if (startISO && endISO) {
        const apiFilters = { 
          startDate: startISO + 'T00:00:00.000Z', 
          endDate: endISO + 'T23:59:59.999Z', 
          comparisonPeriod: e.target.value 
        };
        dispatch(fetchRevenueOverTime(apiFilters));
      }
    }
  };

  // Handle Enter key for date filtering
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const startISO = convertToISO(localFilters.startDate);
      const endISO = convertToISO(localFilters.endDate);
      
      if (startISO && endISO) {
        const apiFilters = { 
          startDate: startISO + 'T00:00:00.000Z', 
          endDate: endISO + 'T23:59:59.999Z', 
          comparisonPeriod: localFilters.comparisonPeriod 
        };
        
        console.log('Sending date filters to API:', apiFilters);
        dispatch(setFilters(apiFilters));
        dispatch(fetchRevenueOverTime(apiFilters));
      }
    }
  };

  // Helper function to convert MM/DD/YYYY to ISO
  const convertToISO = (dateString) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    if (month && day && year) {
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      const yearNum = parseInt(year, 10);
      
      if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31 && yearNum >= 1900 && yearNum <= 2100) {
        return `${yearNum}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    return '';
  };

  return (
    <div>
      <Header
        localFilters={localFilters}
        setLocalFilters={setLocalFilters}
        handleKeyDown={handleKeyDown}
        handleComparisonChange={handleComparisonChange}
      />

      <Dashboard
        revenueFilters={localFilters}   // Only RevenueOverTime responds to this
      />
    </div>
  );
};

export default App;
