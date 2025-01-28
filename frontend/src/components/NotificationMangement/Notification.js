import  { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications(){
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/notifications', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setNotifications(response.data.notifications);
        setError(null); 
      } catch (error) {
        setError('Failed to fetch notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Notifications</h2>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="alert ">{error}</div>
      ) : notifications.length > 0 ? (
        <ul >
          {notifications.map(notification => (
            <li  key={notification._id}>
              {notification.message} - {new Date(notification.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert ">No notifications found</div>
      )}
    </div>
  );
};

export default Notifications
