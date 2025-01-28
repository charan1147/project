import { Link } from 'react-router-dom';
import './Admin.css';

function AdminDashboard(){
  return (
    <div className="container">
      <h2 className="title">Admin Dashboard</h2>
      <ul className="dashboard-list">
        <li className="dashboard-item"><Link to="/add-book">Add Book</Link></li>
        <li className="dashboard-item"><Link to="/books/update/:id">Update Book</Link></li>
        <li className="dashboard-item"><Link to="/delete-book/:id">Delete Book</Link></li>
        <li className="dashboard-item"><Link to="/change-password">Change Password</Link></li>
        <li className="dashboard-item"><Link to="/view-reservations">View Reservations</Link></li>
        <li className="dashboard-item"><Link to="/overdue-reservations">Overdue Reservations</Link></li>
        <li className="dashboard-item"><Link to="/profile">profile</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
