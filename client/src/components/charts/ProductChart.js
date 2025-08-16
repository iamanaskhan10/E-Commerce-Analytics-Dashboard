import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const ProductChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="loading">Loading chart data...</div>;
  }

  const chartData = data.map(item => ({
    product: item.product,
    revenue: item.revenue,
    conversionRate: item.conversionRate
  }));

  return (
    <div style={{ width: "100%" }}>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 15, right: 40, left: 70, bottom: 15 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* Bottom X-axis for revenue (no ticks) */}
          <XAxis
            type="number"
            xAxisId="revenue"
            orientation="bottom"
            tick={false}
            axisLine={false}
          />

          {/* Top X-axis for conversion rate (no ticks) */}
          <XAxis
            type="number"
            xAxisId="conversion"
            orientation="top"
            tick={false}
            axisLine={false}
          />

          <YAxis
            dataKey="product"
            type="category"
            tick={{ fontSize: 11 }}
          />

          <Tooltip
            formatter={(value, name) =>
              name === 'revenue'
                ? [`$${value.toLocaleString()}`, 'Revenue']
                : [`${value.toFixed(2)}%`, 'Conversion Rate']
            }
          />

          {/* Blue Bar - Revenue */}
          <Bar
            dataKey="revenue"
            xAxisId="revenue"
            fill="#054A91"
            radius={[0, 4, 4, 0]}
          >
            <LabelList
              dataKey="revenue"
              position="right"
              formatter={(value) => `$${value.toLocaleString()}`}
              style={{ fill: '#000', fontSize: 11 }}
            />
          </Bar>

          {/* Orange Bar - Conversion Rate */}
          <Bar
            dataKey="conversionRate"
            xAxisId="conversion"
            fill="#F97316"
            radius={[0, 4, 4, 0]}
          >
            <LabelList
              dataKey="conversionRate"
              position="right"
              formatter={(value) => `${value.toFixed(2)}%`}
              style={{ fill: '#000', fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
