import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const TransactionsTable = ({ month, handleMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: { month, search, page, perPage }
      });
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    };
    fetchData();
  }, [month, search, page, perPage]);

  const handleNextPage = () => {
    if (page < Math.ceil(total / perPage)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="mb-4"> {/* Add margin-bottom for spacing */}
      <h2>Transactions Table</h2>

      {/* Month Selection Dropdown */}
      <div className="d-flex justify-content-center mb-3">
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

      <input
        type="text"
        className="form-control mb-3" // Bootstrap form control class for styling
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions..."
      />
      <div className="table-responsive"> {/* Responsive table wrapper */}
        <table className="table table-bordered table-hover"> 
          <thead className="table-light"> {/* Light background for the header */}
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Sold</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="d-flex justify-content-between mt-3"> {/* Flexbox for alignment */}
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {Math.ceil(total / perPage)}</span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={page === Math.ceil(total / perPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
