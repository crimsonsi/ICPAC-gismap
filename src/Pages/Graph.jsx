import React, { useState, useEffect } from "react";

const Graph = ({ selectedYear, selectedMonth }) => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(selectedMonth);

  useEffect(() => {
    const fetchGraph = async () => {
      setLoading(true); // Start loading state
      setError(null); // Reset error state

      try {
        // Construct the API URL based on the selected year and month
        const url = `https://droughtwatch.icpac.net/eadw-api/visualization-graphs?year=${selectedYear}&month=${selectedMonth}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.graph_url) {
          setGraphData(data.graph_url); // Set the graph URL if available
        } else {
          setError(`No graph for ${selectedMonth}`);
        }
      } catch (error) {
        setError("Failed to fetch graph. Please try again.");
        console.error("Failed to fetch graph:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGraph(); // Fetch graph when component mounts or selectedYear/selectedMonth changes
  }, [selectedYear, selectedMonth]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Graph Viewer</h2>
      {loading && <p>Loading graph...</p>} {/* Show loading message */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error if any */}
      {graphData && !loading && !error ? (
        <img
          src={graphData}
          alt="Visualization Graph"
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      ) : null}
    </div>
  );
};

export default Graph;
