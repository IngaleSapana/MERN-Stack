import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register chart.js components
ChartJS.register(
  CategoryScale, // For categorical x-axis
  LinearScale,   // For linear y-axis
  BarElement,    // For bar charts
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bar-chart', { params: { month } });
        const labels = response.data.map((range) => range._id);
        const values = response.data.map((range) => range.count);

        setData({
          labels,
          datasets: [
            {
              label: 'Price Range Distribution',
              data: values,
              backgroundColor: 'rgba(75,192,192,0.4)',
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data", error);
      }
    };
    fetchBarChartData();
  }, [month]);

  if (!data) {
    return <div>Loading chart...</div>;
  }
  return (
    <div className="bar-chart-container">
      <h2 className="bar-chart-title">Price Range Distribution for {month}</h2>
      <div className="bar-chart">
        <Bar data={data} />
      </div>
    </div>
);
};

export default BarChart;
