import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, userRole, handleLogout }){
  return (
    <nav className="navigation-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}
            {userRole === 'user' && (
              <li className="nav-item">
                <Link className="nav-link" to="/user-dashboard">User Dashboard</Link>
              </li>
            )}
            <li className="nav-item">
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
