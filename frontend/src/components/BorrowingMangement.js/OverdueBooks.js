import { useState, useEffect } from 'react';
import axios from 'axios';
import './OverdueBooks.css';

function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/borrowings/overdue', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setOverdueBooks(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch overdue books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOverdueBooks();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Overdue Books</h2>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : overdueBooks.length > 0 ? (
        <ul className="book-list">
          {overdueBooks.map(book => (
            <li className="book-item" key={book._id}>
              <h5>{book.bookId.title}</h5>
              <p>Borrowed by {book.userId.name} - Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info">No overdue books found</div>
      )}
    </div>
  );
};

export default OverdueBooks;
