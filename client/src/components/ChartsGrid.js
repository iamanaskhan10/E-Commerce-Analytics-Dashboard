import React from "react";
import RevenueChart from "./charts/RevenueChart";
import ProductChart from "./charts/ProductChart";
import MarketingChart from "./charts/MarketingChart";
import DeviceChart from "./charts/DeviceChart";
import USStatesMapChart from "./charts/USStatesMapChart";
const ChartsGrid = ({
  revenueOverTime,
  products,
  marketing,
  devices,
  states,
}) => {
  return (
    <div className="charts-grid">
      {" "}
      <div className="top-charts">
        {" "}
        <div className="chart-container">
          {" "}
          <div className="chart-title">
            {" "}
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>
              Ecommerce Revenue
            </span>{" "}
            and{" "}
            <span style={{ color: "#f97316", fontWeight: "bold" }}>
              Conversion Rate
            </span>{" "}
            Over Time{" "}
          </div>{" "}
          <RevenueChart data={revenueOverTime} />{" "}
        </div>{" "}
        <div className="chart-container">
          {" "}
          <div className="chart-title">
            {" "}
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>
              Ecommerce Revenue
            </span>{" "}
            and{" "}
            <span style={{ color: "#f97316", fontWeight: "bold" }}>
              Conversion Rate
            </span>{" "}
            by Product{" "}
          </div>{" "}
          <ProductChart data={products} />{" "}
        </div>{" "}
      </div>{" "}
      <div className="bottom-charts">
        {" "}
        <div className="chart-container">
          {" "}
          <div className="chart-title">
            {" "}
            <span style={{ color: "#0d9488", fontWeight: "bold" }}>
              Attributed Revenue
            </span>{" "}
            and{" "}
            <span style={{ color: "#f97316", fontWeight: "bold" }}>
              Conversion Rate
            </span>{" "}
            by Marketing Channel{" "}
          </div>{" "}
          <MarketingChart data={marketing} />{" "}
        </div>{" "}
        <div className="chart-container">
          {" "}
          <div className="chart-title">Ecommerce Revenue by State</div>{" "}
          <USStatesMapChart data={states} />{" "}
        </div>{" "}
        <div className="chart-container">
          {" "}
          <div className="chart-title">
            Ecommerce Revenue and Conversion Rate by Device
          </div>{" "}
          <DeviceChart data={devices} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ChartsGrid;
