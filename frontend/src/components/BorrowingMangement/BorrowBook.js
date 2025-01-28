import { useState } from 'react';
import axios from 'axios';
import './BorrowBook.css';

function BorrowBook() {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
       await axios.post('http://localhost:6001/api/borrowing/borrow', {
        bookId,
        userId,
        dueDate
      }, {
        headers: { 'x-auth-token': token }
      });
      setSuccess('Book borrowed successfully!');
      setBookId('');
      setUserId('');
      setDueDate('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to borrow book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Borrow Book</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookId">Book ID</label>
          <input
            type="text"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Book ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
            required
          />
        </div>
        <button className="btn" type="submit">Borrow Book</button>
      </form>
    </div>
  );
}

export default BorrowBook;
