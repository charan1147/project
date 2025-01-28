import { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewReservations.css'

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:6001/api/reservations', {
          headers: { 'x-auth-token': token }
        });
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setReservations(response.data);
        } else {
          setError('Unexpected response structure');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch reservations. Please try again.');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container">
      <h2 className="title">All Reservations</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <ul className="reservation-list">
        {reservations.map(reservation => (
          <li key={reservation._id} className="reservation-item">
            <div><strong>Book Title:</strong> {reservation.book.title}</div>
            <div><strong>User Name:</strong> {reservation.user.name}</div>
            <div><strong>Reservation Date:</strong> {new Date(reservation.dueDate).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminReservations;
