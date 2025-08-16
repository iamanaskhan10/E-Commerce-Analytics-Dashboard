import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const DeviceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="loading">Loading chart data...</div>;
  }

  // We will split the chart into two halves: 0-50% = Revenue, 50-100% = Conversion Rate
  const MAX_SCALE = 100; // fixed total
  const MID_POINT = 50; // where conversion rate starts

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  const chartData = data.map(item => ({
    device: item.device,
    // Scale revenue to fit in first half (0-50)
    revenue: (item.revenue / maxRevenue) * MID_POINT,
    // Spacer to push conversion rate to mid
    spacer: MID_POINT,
    // Conversion rate scaled to second half (0-50)
    conversionRate: (item.conversionRate * 3) // exaggerate height
    }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} layout="vertical" barGap={6} margin={{ top: 10, right: 20, left: 15, bottom: 15 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, MAX_SCALE]} />
        <YAxis dataKey="device" type="category" />
        <Tooltip />
        <Legend />

        {/* First Column - Revenue */}
        <Bar dataKey="revenue" fill="#0d9488" radius={[0, 4, 4, 0]} />

        {/* Invisible spacer to fix second column start */}
        <Bar dataKey="spacer" stackId="b" fill="transparent" />

        {/* Second Column - Conversion Rate */}
        <Bar dataKey="conversionRate" stackId="b" fill="#f59e0b" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeviceChart;
