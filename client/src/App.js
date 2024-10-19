import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
  const [month, setMonth] = useState('03'); // Default to March

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-12 mt-3">
          <h1 className="text-center">Transactions Dashboard</h1> {/* Center the heading */}

          {/* Month Selection Dropdown */}
          <select className="form-select mb-3" value={month} onChange={handleMonthChange}>
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

          {/* Transactions Table */}
          <div className="table-responsive mb-3">
            <TransactionsTable month={month} />
          </div>

          {/* Statistics Box */}
          <div className="row justify-content-center mt-3">
            <div className="col-md-6 col-lg-4">
              <div className="card text-center">
                <div className="card-header">
                  Statistics for {month}
                </div>
                <div className="card-body">
                  <StatisticsBox month={month} />
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart and Pie Chart */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-6">
              <h2 className="text-center">Price Range Distribution</h2>
              <BarChart month={month} />
            </div>
            <div className="col-md-6">
              <h2 className="text-center">Category Distribution</h2>
              <PieChart month={month} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
