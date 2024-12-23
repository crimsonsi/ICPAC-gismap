import React, { useState } from "react";
import MapComponent from "./MapComponent.jsx";
import GraphComponent from "./GraphComponent.jsx";

const Landing = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [selectedTenDays, setSelectedTenDays] = useState("21");

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{ fontSize: "1.5rem", color: "#4a90e2" }}>
          Map and Graph Visualisation
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ margin: "0 5px", textAlign: "center" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Year:
          </label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "120px",
              textAlign: "center",
            }}
          />
        </div>
        <div style={{ margin: "0 15px", textAlign: "center" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Month:
          </label>
          <input
            type="number"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "120px",
              textAlign: "center",
            }}
          />
        </div>
        <div style={{ margin: "0 15px", textAlign: "center" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Day:
          </label>
          <input
            type="number"
            value={selectedTenDays}
            onChange={(e) => setSelectedTenDays(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "120px",
              textAlign: "center",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <MapComponent
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedTenDays={selectedTenDays}
        />
        <GraphComponent
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
};

export default Landing;
