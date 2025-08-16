import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

const MarketingChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="loading">Loading chart data...</div>;
  }

  // Sort to match your mock (highest revenue first)
  const chartData = data
    .map(d => ({
      channel: d.channel,
      revenue: d.revenue,                 // number like 56115
      conversionRate: d.conversionRate    // number like 1.45 (percent)
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Shared chart styling
  const margins = { top: 0, right: 20, left: 0, bottom: 0 };
  const barSize = 18;
  const barGap = 12;

  return (
    <div>
      {/* Two-column layout with a vertical divider */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          alignItems: "stretch",
          columnGap: 0
        }}
      >
        {/* LEFT COLUMN — GREEN revenue bars */}
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              layout="vertical"
              barCategoryGap={barGap}
              margin={margins}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              {/* No numeric ticks/range lines */}
              <XAxis type="number" tick={false} axisLine={false} domain={[0, "dataMax"]} />
              {/* Show channel labels only on the left chart */}
              <YAxis
                type="category"
                dataKey="channel"
                width={100}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(v, n) => (n === "revenue" ? [`$${v.toLocaleString()}`, "Revenue"] : v)}
              />
              <Bar dataKey="revenue" fill="#0d9488" barSize={barSize} radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="revenue"
                  position="right"
                  formatter={(v) => `$${v.toLocaleString()}`}
                  fill="#000"
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* VERTICAL DIVIDER */}
        <div style={{ backgroundColor: "#e5e7eb" }} />

        {/* RIGHT COLUMN — YELLOW conversion bars */}
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              layout="vertical"
              barCategoryGap={barGap}
              margin={margins}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              {/* No numeric ticks/range lines */}
              <XAxis type="number" tick={false} axisLine={false} domain={[0, "dataMax"]} />
              {/* Hide Y labels here but keep the same ordering to align rows */}
              <YAxis type="category" dataKey="channel" hide />
              <Tooltip
                formatter={(v, n) =>
                  n === "conversionRate" ? [`${Number(v).toFixed(2)}%`, "Conversion Rate"] : v
                }
              />
              <Bar
                dataKey="conversionRate"
                fill="#f59e0b"
                barSize={barSize}
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="conversionRate"
                  position="right"
                  formatter={(v) => `${Number(v).toFixed(2)}%`}
                  fill="#000"
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom labels under each column (like the screenshot footer) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          marginTop: 6,
          fontSize: 11
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 12, background: "#0d9488", display: "inline-block" }} />
          Attributed Revenue
        </div>
        <div />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 12, background: "#f59e0b", display: "inline-block" }} />
          Ecommerce Conversion Rate
        </div>
      </div>
    </div>
  );
};

export default MarketingChart;
