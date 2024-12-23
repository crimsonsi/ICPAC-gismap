import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const GraphComponent = ({ selectedYear, selectedMonth, selectedTarget }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraph = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://droughtwatch.icpac.net/eadw-api/visualization-graphs?year=${selectedYear}&month=${selectedMonth}&target=${selectedTarget}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data && data.chart_data) {
          setChartData(data.chart_data);
        } else {
          setError("No graph available for the selected date.");
        }
      } catch (error) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, [selectedYear, selectedMonth, selectedTarget]);

  const getPieChartOption = () => {
    if (!chartData) return {};

    return {
      title: {
        text: `Drought Impact - ${selectedTarget}`,
        subtext: `Data Date: ${selectedYear}-${selectedMonth}-01`,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: chartData.map((item) => item.name),
      },
      series: [
        {
          name: selectedTarget,
          type: "pie",
          radius: "50%",
          data: chartData.map((item) => ({
            value: item.value,
            name: item.name,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Graphical Assessment</h2>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {chartData ? (
        <ReactECharts
          option={getPieChartOption()}
          style={{ height: "400px", width: "100%" }}
        />
      ) : null}
    </div>
  );
};

export default GraphComponent;
