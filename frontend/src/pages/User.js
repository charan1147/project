import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './User.css';

function UserDashboard(){
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:6001/api/users/me', {
          headers: {
            'x-auth-token': token,
          },
        });

        setUserId(response.data._id);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user details. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading User ID...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">User Dashboard</h2>
      {userId && <p>User ID: {userId}</p>}
      <ul className="dashboard-list">
        <li className="dashboard-item"><Link to="/reserve-book">Reserve Book</Link></li>
        <li className="dashboard-item"><Link to="/cancel-reservation/:id">Cancel Reservation</Link></li>
        <li className="dashboard-item"><Link to="/borrow-book">Borrow Book</Link></li>
        <li className="dashboard-item"><Link to="/return-book/:id">Return Book</Link></li>
        <li className="dashboard-item"><Link to="/overdue-books">Overdue Books</Link></li>
        <li className="dashboard-item"><Link to="/change-password">Change Password</Link></li>
        <li className="dashboard-item"><Link to="/user-reservations">View Reservation</Link></li>
        <li className="dashboard-item"><Link to="/profile">profile</Link></li>
      </ul>
    </div>
  );
};

export default UserDashboard;
