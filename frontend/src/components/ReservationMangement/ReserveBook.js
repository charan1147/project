import { useState } from 'react';
import axios from 'axios';
import './ReserveBook.css';

function ReserveBook(){
  const [bookId, setBookId] = useState('');
  const [userId] = useState(localStorage.getItem('userId') || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleReserveBook = async () => {
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:6001/api/reservations', {
        bookId,
        userId
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      setSuccess('Book reserved successfully!');
      setBookId('');
    } catch (error) {
      setError('Failed to reserve book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Reserve Book</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="form-group">
        <label htmlFor="bookId">Book ID</label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          readOnly
        />
      </div>
      <button className="btn" onClick={handleReserveBook}>Reserve Book</button>
    </div>
  );
};

export default ReserveBook;
