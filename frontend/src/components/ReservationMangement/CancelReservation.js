import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CancelReservation.css';

function CancelReservation(){
  const [reservationId, setReservationId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCancel = async () => {
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication token is missing');
        return;
      }

      if (!reservationId) {
        setError('Reservation ID is required');
        return;
      }

      await axios.delete(`http://localhost:6001/api/reservations/${reservationId}`, {
        headers: { 'x-auth-token': token }
      });

      setSuccess('Reservation canceled successfully.');
      setTimeout(() => {
        navigate('/view-reservations');
      }, 2000);
    } catch (error) {
      setError('Failed to cancel reservation. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Cancel Reservation</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="form-group">
        <label htmlFor="reservationId">Reservation ID</label>
        <input
          type="text"
          id="reservationId"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          placeholder="Enter Reservation ID"
          required
        />
      </div>
      <button className="btn" onClick={handleCancel}>Cancel Reservation</button>
    </div>
  );
};

export default CancelReservation;
