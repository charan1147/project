import { useState, useEffect } from 'react';
import axios from 'axios';

function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:6001/api/reservations/user', {
          headers: { 'x-auth-token': token }
        });
        setReservations(response.data.reservations);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch reservations. Please try again.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:6001/api/reservations/${reservationId}`, {
        headers: { 'x-auth-token': token }
      });
      setSuccess('Reservation canceled successfully.');
      setReservations(reservations.filter(reservation => reservation._id !== reservationId));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel reservation. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">My Reservations</h2>
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <ul className="reservation-list">
        {reservations.map(reservation => (
          <li key={reservation._id} className="reservation-item">
            <div><strong>Book Title:</strong> {reservation.book.title}</div>
            <div><strong>Reservation Date:</strong> {new Date(reservation.dueDate).toLocaleDateString()}</div>
            <button className="btn btn-cancel" onClick={() => handleCancel(reservation._id)}>Cancel Reservation</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReservations;
