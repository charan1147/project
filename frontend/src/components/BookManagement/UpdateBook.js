import { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateBook.css'
 

function UpdateBook(){
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [book, setBook] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    availabilityStatus: "available"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
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

  const fetchBookDetails = async (id) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:6001/api/books/view/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setBook(response.data);
      setSelectedBookId(id);
      setError(null);
    } catch (err) {
      setError("Failed to fetch book details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('token');
    try {
         await axios.put(`http://localhost:6001/api/books/update/${selectedBookId}`, book, {
        headers: {
          'x-auth-token': token
        }
      });
      setSuccess("Book updated successfully!");
      setBook({
        title: "",
        author: "",
        ISBN: "",
        genre: "",
        publicationYear: "",
        availabilityStatus: "available"
      });
      setSelectedBookId(null);
    } catch (err) {
      setError("Failed to update book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Book List</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {books.length === 0 ? (
        <div>No books available.</div>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              {book.title}
              <button className="btn" onClick={() => fetchBookDetails(book._id)}>Update</button>
            </li>
          ))}
        </ul>
      )}

      {selectedBookId && (
        <div>
          <h2 className="title">Update Book</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author"
                id="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ISBN">ISBN</label>
              <input
                type="text"
                name="ISBN"
                id="ISBN"
                value={book.ISBN}
                onChange={handleChange}
                placeholder="ISBN"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                name="genre"
                id="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="Genre"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationYear">Publication Year</label>
              <input
                type="number"
                name="publicationYear"
                id="publicationYear"
                value={book.publicationYear}
                onChange={handleChange}
                placeholder="Publication Year"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="availabilityStatus">Availability Status</label>
              <select
                name="availabilityStatus"
                id="availabilityStatus"
                value={book.availabilityStatus}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Book"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
