import { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

function ChangePassword(){
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');

      await axios.put('http://localhost:6001/api/users/password', {
        oldPassword,
        newPassword
      }, {
        headers: { 'x-auth-token': token }
      });
      setSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Change Password</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
        </div>
        <button className="btn" type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
