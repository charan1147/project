import { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBooks.css';

function SearchBooks({ term, filter }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/books/view');
        setBooks(response.data.books);
        setError(null);
      } catch (error) {
        setError("Failed to fetch books. Please try again later.");
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book[filter].toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">Search Results</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="card-text">{book.ISBN}</p>
                <p className="card-text">{book.genre}</p>
                <p className="card-text">{book.author}</p>
                <p className="card-text">ID: {book._id}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-error">No books found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
