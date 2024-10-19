import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';


// Register required elements
ChartJS.register(
  ArcElement,   // Register arc element for pie/doughnut charts
  Tooltip,
  Legend
);

const PieChart = ({ month }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pie-chart', { params: { month } });
        const labels = response.data.map((category) => category._id);
        const values = response.data.map((category) => category.count);

        setData({
          labels,
          datasets: [
            {
              label: 'Category Distribution',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data", error);
      }
    };

    fetchPieChartData();
  }, [month]);

  if (!data) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Category Distribution for {month}</h2>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
