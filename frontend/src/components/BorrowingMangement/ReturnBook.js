import  { useState } from 'react';
import axios from 'axios';
import "./ReturnBook.css"

function ReturnBook(){
  const [borrowedId, setBorrowedId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleReturn = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.put(`http://localhost:6001/api/borrowing/return/${borrowedId}`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setSuccess('Book returned successfully!');
      setBorrowedId('');
    } catch (error) {
      setError('Failed to return book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Return Book</h2>
      {error && <div className="alert ">{error}</div>}
      {success && <div className="alert ">{success}</div>}
      <form className="form" onSubmit={handleReturn}>
        <div className="form-group">
          <label htmlFor="borrowedId">Borrowed ID</label>
          <input
            type="text"
            id="borrowedId"
            value={borrowedId}
            onChange={(e) => setBorrowedId(e.target.value)}
            placeholder="Borrowed ID"
            required
          />
        </div>
        <button className="btn " type="submit">Return Book</button>
      </form>
    </div>
  );
};

export default ReturnBook
