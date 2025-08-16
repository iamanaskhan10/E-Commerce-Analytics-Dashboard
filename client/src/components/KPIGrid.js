// components/KPIGrid.jsx
import React from 'react';

const KPIGrid = ({ kpis }) => {
  // Always have a safe object
  const safe = kpis ?? {};
  const {
    ecommerceRevenue = 0,
    newCustomers = 0,
    repeatPurchaseRate = 0,
    averageOrderValue = 0,
    ecommerceConversionRate = 0,
  } = safe;

  const kpiData = [
    {
      title: 'Ecommerce Revenue',
      value: `$${Number(ecommerceRevenue).toLocaleString()}`,
      change: '+10.62%',
      isPositive: true,
    },
    {
      title: 'New Customers',
      value: Number(newCustomers).toLocaleString(),
      change: '-22.66%',
      isPositive: false,
    },
    {
      title: 'Repeat Purchase Rate',
      value: `${Number(repeatPurchaseRate)}%`,
      change: '+41.12%',
      isPositive: true,
    },
    {
      title: 'Average Order Value',
      value: `$${Number(averageOrderValue).toLocaleString()}`,
      change: '-12.10%',
      isPositive: false,
    },
    {
      title: 'Ecommerce Conversion Rate',
      value: `${Number(ecommerceConversionRate)}%`,
      change: '+0.98%',
      isPositive: true,
    },
  ];

  return (
    <div className="kpi-grid">
      {kpiData.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className="kpi-title">{kpi.title}</div>
          <div className="kpi-value">{kpi.value}</div>
          <div className={`kpi-change ${kpi.isPositive ? 'positive' : 'negative'}`}>
            {kpi.isPositive ? '↗' : '↘'} {kpi.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;
