import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchKPIs,
  fetchProducts,
  fetchMarketing,
  fetchStates,
  fetchDevices,
  fetchRevenueOverTime
} from '../store/dashboardSlice';
import KPIGrid from './KPIGrid';
import ChartsGrid from './ChartsGrid';
import Loader from './Loader';

const Dashboard = ({ revenueFilters }) => {
  const dispatch = useDispatch();
  const { loading, kpis, revenueOverTime, products, marketing, states, devices } =
    useSelector((state) => state.dashboard);

  // Fetch KPIs independently - ONLY ONCE, never changes
  useEffect(() => {
    console.log('Dashboard: Fetching KPIs independently (one-time fetch)');
    dispatch(fetchKPIs());
  }, [dispatch]);

  // Fetch all other charts independently - ONLY ONCE, never changes
  useEffect(() => {
    console.log('Dashboard: Fetching other charts independently (one-time fetch)');
    dispatch(fetchProducts());
    dispatch(fetchMarketing());
    dispatch(fetchStates());
    dispatch(fetchDevices());
  }, [dispatch]);

  // ONLY RevenueOverTime responds to date filtering
  useEffect(() => {
    if (revenueFilters.startDate && revenueFilters.endDate) {
      console.log('Dashboard: RevenueOverTime responding to filters:', revenueFilters);
      dispatch(fetchRevenueOverTime(revenueFilters));
    }
  }, [dispatch, revenueFilters]);

  // Initial default load for RevenueOverTime (first entry -> last entry)
  useEffect(() => {
    if (!revenueOverTime || revenueOverTime.length === 0) {
      console.log('Dashboard: Loading initial RevenueOverTime data');
      dispatch(fetchRevenueOverTime({})); // API should default to full range if params are empty
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <KPIGrid kpis={kpis} />
      <ChartsGrid
        revenueOverTime={revenueOverTime}
        products={products}
        marketing={marketing}
        devices={devices}
        states={states}
      />
    </div>
  );
};

export default Dashboard;
