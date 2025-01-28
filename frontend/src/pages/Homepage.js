import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBooks from '../components/BookManagement/SearchBooks'; 
import './Homepage.css';

function Homepage(){
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('title');

  const handleSearchChange = (e) => {
    setTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container">
      <h1>Welcome to the Library</h1>
      <div className="row">
        <div className="column">
          <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                type="text"
                value={term}
                onChange={handleSearchChange}
                placeholder="Search term"
                className="input"
              />
            </div>
            <div className="form-group">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="select"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="ISBN">ISBN</option>
                <option value="genre">Genre</option>
              </select>
            </div>
            <button className="btn" onClick={() => setTerm(term)}>Search</button>
          </form>
        </div>
      </div>
      <SearchBooks term={term} filter={filter} />
      <div className="row">
        <div className="column">
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
