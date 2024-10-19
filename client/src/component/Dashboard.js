import React, { useState } from 'react';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TransactionsTable from './TransactionsTable';
import BarChart from './BarChart';
import PieChart from './PieChart';
import StatisticsBox from './StatisticsBox';

const Dashboard = () => {
  const [month, setMonth] = useState('03');  // Default March

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="container-fluid mt-4">
      {/* Dashboard Header and Month Selector */}
      {/* <div className="row mb-3"> */}
        <div className="col-md-8">
          <h1>Transactions Dashboard</h1>
        </div>
        {/* <div className="col-md-4">
          <select className="form-select" value={month} onChange={handleMonthChange}>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div> */}

      {/* Dashboard Components */}
      <div className="row">
        <div className="col-md-6">
          <TransactionsTable month={month} />
        </div>
        <div className="col-md-6">
          <StatisticsBox month={month} />
        </div>
      </div>

      {/* Optional Bar and Pie Charts */}
      {/* Uncomment if needed */}
      {/* 
      <div className="row">
        <div className="col-md-6">
          <h2>Price Range Distribution</h2>
          <BarChart month={month} />
        </div>
        <div className="col-md-6">
          <h2>Category Distribution</h2>
          <PieChart month={month} />
        </div>
      </div>
      */}
    </div>
  );
};

export default Dashboard;
