import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const USStatesMapChart = ({ data }) => {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  if (!data || data.length === 0) {
    return <div className="loading">Loading map data...</div>;
  }

  // Create a map of state data for easy lookup
  const stateDataMap = {};
  data.forEach(item => {
    stateDataMap[item.state] = item.revenue;
  });

  // Calculate color based on revenue
  const getColor = (revenue) => {
    if (revenue >= 70000) return '#1e40af'; // Dark blue for high revenue
    if (revenue >= 50000) return '#3b82f6'; // Blue for medium-high
    if (revenue >= 30000) return '#60a5fa'; // Light blue for medium
    return '#93c5fd'; // Very light blue for low
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const revenue = stateDataMap[stateName] || 0;
                
                                 return (
                   <Geography
                     key={geo.rsmKey}
                     geography={geo}
                     fill={getColor(revenue)}
                     stroke="#fff"
                     strokeWidth={0.5}
                     style={{
                       default: { outline: "none" },
                       hover: { 
                         fill: "#facc15", 
                         outline: "none",
                         stroke: "#1e293b",
                         strokeWidth: 1
                       },
                       pressed: { outline: "none" }
                     }}
                     onMouseEnter={(e) => {
                       setTooltip({
                         show: true,
                         content: `${stateName}: $${revenue.toLocaleString()}`,
                         x: e.clientX,
                         y: e.clientY
                       });
                     }}
                     onMouseLeave={() => {
                       setTooltip({ show: false, content: '', x: 0, y: 0 });
                     }}
                   />
                 );
              })
            }
          </Geographies>
                 </ZoomableGroup>
       </ComposableMap>
       
       {/* Custom Tooltip */}
       {tooltip.show && (
         <div
           style={{
             position: 'fixed',
             top: tooltip.y - 40,
             left: tooltip.x + 10,
             backgroundColor: 'rgba(0, 0, 0, 0.8)',
             color: 'white',
             padding: '8px 12px',
             borderRadius: '6px',
             fontSize: '12px',
             fontWeight: '500',
             zIndex: 1000,
             pointerEvents: 'none',
             boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
           }}
         >
           {tooltip.content}
         </div>
       )}
       
       {/* Copyright */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10px', 
        right: '10px', 
        fontSize: '10px', 
        color: '#64748b',
        background: 'rgba(255,255,255,0.8)',
        padding: '4px 8px',
        borderRadius: '4px'
      }}>
        © 2020 Mapbox © OpenStreetMap
      </div>
    </div>
  );
};

export default USStatesMapChart;
