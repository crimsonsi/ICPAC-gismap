import React, { useState, useEffect } from "react";

const GraphViewer = ({ selectedYear, selectedMonth }) => {
  const [graphUrl, setGraphUrl] = useState("");

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await fetch(
          `https://droughtwatch.icpac.net/eadw-api/visualization-graphs?year=${selectedYear}&month=${selectedMonth}`
        );
        const data = await response.json();
        if (data.graph_url) {
          setGraphUrl(data.graph_url);
        }
      } catch (error) {
        console.error("Failed to fetch graph:", error);
      }
    };

    fetchGraph();
  }, [selectedYear, selectedMonth]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Graph Viewer</h2>
      {graphUrl ? (
        <img
          src={graphUrl}
          alt="Visualization Graph"
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
};

export default GraphViewer;
