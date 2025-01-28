import { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteBookPage.css'; 

function DeleteBookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:6001/api/books/view', {
          headers: {
            'x-auth-token': token
        }
        });
        setBooks(response.data.books);
        setError(null);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:6001/api/books/delete/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setBooks(books.filter(book => book._id !== id));
      setSuccess("Book deleted successfully!");
    } catch (err) {
      setError("Failed to delete book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Delete Book</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {books.length === 0 ? (
        <div>No books available to delete.</div>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              {book.title}
              <button className="btn" onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteBookPage
