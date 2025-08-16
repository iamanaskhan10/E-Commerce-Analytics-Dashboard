import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
  const [kpi1, setKpi1] = useState('Ecommerce Revenue');
  const [kpi2, setKpi2] = useState('Ecommerce Conversion Rate');
  const [dateBreakdown, setDateBreakdown] = useState('Weekly');

  // Filter data based on date breakdown
  const getFilteredData = () => {
    if (!data || data.length === 0) return [];
    
    if (dateBreakdown === 'Weekly') {
      // Show weekly data (every 7th entry or group by week)
      return data.filter((_, index) => index % 7 === 0 || index === data.length - 1);
    } else if (dateBreakdown === 'Monthly') {
      // Show monthly data (every 30th entry or group by month)
      return data.filter((_, index) => index % 30 === 0 || index === data.length - 1);
    } else {
      // Daily - show all data
      return data;
    }
  };

  const filteredData = getFilteredData();

  // Format data for the chart
  const chartData = filteredData.map(item => ({
    date: item.formattedDate || item.date,
    'Ecommerce Revenue': item.revenue || 0,
    'Ecommerce Conversion Rate': item.conversionRate || 0
  }));

  return (
    <div style={{ width: '100%', height: 400 }}>
      {/* Header with dropdowns matching screenshot */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      }}>
        {/* KPI 1 Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#175582' // Blue color matching screenshot
          }}>
            KPI1
          </label>
          <select 
            value={kpi1} 
            onChange={(e) => setKpi1(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              fontSize: '13px', 
              border: '1px solid #ddd', 
              borderRadius: '6px',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            <option value="Ecommerce Revenue">Ecommerce Revenue</option>
            <option value="Sales">Sales</option>
            <option value="Orders">Orders</option>
          </select>
        </div>

        {/* KPI 2 Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#f97316' // Orange color matching screenshot
          }}>
            KPI2
          </label>
          <select 
            value={kpi2} 
            onChange={(e) => setKpi2(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              fontSize: '13px', 
              border: '1px solid #ddd', 
              borderRadius: '6px',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            <option value="Ecommerce Conversion Rate">Ecommerce Conversion Rate</option>
            <option value="Growth">Growth</option>
            <option value="Trend">Trend</option>
          </select>
        </div>

        {/* Date Breakdown Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#000000' // Black color matching screenshot
          }}>
            Date Breakdown
          </label>
          <select 
            value={dateBreakdown} 
            onChange={(e) => setDateBreakdown(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              fontSize: '13px', 
              border: '1px solid #ddd', 
              borderRadius: '6px',
              backgroundColor: 'white',
              minWidth: '120px'
            }}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          {/* X-Axis - Time */}
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#666' }}
            tickFormatter={(value) => {
              if (typeof value === 'string') {
                // Convert to short month format like "Feb 1", "Mar 1"
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                  const month = date.toLocaleDateString('en-US', { month: 'short' });
                  const day = date.getDate();
                  return `${month} ${day}`;
                }
                return value;
              }
              return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
            stroke="#666"
          />
          
          {/* Left Y-Axis - Revenue (Blue) */}
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            tick={{ fontSize: 12, fill: '#175582' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            stroke="#175582"
            label={{ 
              value: 'Revenue ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#175582' }
            }}
          />
          
          {/* Right Y-Axis - Conversion Rate (Orange) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fontSize: 12, fill: '#f97316' }}
            tickFormatter={(value) => value.toFixed(2)}
            stroke="#f97316"
            label={{ 
              value: 'Conversion Rate', 
              angle: 90, 
              position: 'insideRight',
              style: { textAnchor: 'middle', fill: '#f97316' }
            }}
          />
          
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Ecommerce Conversion Rate') {
                return [`${(value * 100).toFixed(2)}%`, name];
              }
              return [`$${value.toLocaleString()}`, name];
            }}
            labelFormatter={(label) => {
              const date = new Date(label);
              if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                });
              }
              return label;
            }}
          />
          
          
          
          {/* Revenue Line (Blue) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Ecommerce Revenue"
            stroke="#175582"
            strokeWidth={3}
            activeDot={{ r: 8, fill: '#175582' }}
            dot={{ r: 4, fill: '#175582' }}
          />
          
          {/* Conversion Rate Line (Orange) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Ecommerce Conversion Rate"
            stroke="#f97316"
            strokeWidth={3}
            activeDot={{ r: 8, fill: '#f97316' }}
            dot={{ r: 4, fill: '#f97316' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;