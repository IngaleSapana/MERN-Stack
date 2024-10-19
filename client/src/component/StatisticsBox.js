import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatisticsBox = ({ month }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get('http://localhost:5000/api/statistics', { params: { month } });
      setStats({
        totalSales: response.data.totalSales[0]?.totalSaleAmount || 0,
        totalSoldItems: response.data.totalSoldItems,
        totalNotSoldItems: response.data.totalNotSoldItems,
      });
    };
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <p>Total Sales: {stats.totalSales}</p>
        <p>Total Sold Items: {stats.totalSoldItems}</p>
        <p>Total Not Sold Items: {stats.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;
