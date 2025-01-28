import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import AddBook from './components/BookManagement/AddBook';
import UpdateBook from './components/BookManagement/UpdateBook';
import DeleteBook from './components/BookManagement/DeleteBook'
import SearchBooks from './components/BookManagement/SearchBooks';
import Register from './components/UserMangement/Register'
import Login from './components/UserMangement/Login'
import ChangePassword from './components/UserMangement/ChangePassword'
import Profile from './components/UserMangement/Profile';
import ReserveBook from './components/ReservationMangement/ReserveBook'
import CancelReservation from './components/ReservationMangement/CancelReservation'
import Notifications from './components/NotificationMangement/Notification'
import BorrowBook from './components/BorrowingMangement/BorrowBook'
import ReturnBook from './components/BorrowingMangement/ReturnBook'
import OverdueBooks from './components/BorrowingMangement/OverdueBooks'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage'
import ViewReservations from './components/ReservationMangement/ViewReservation'
import UserReservations from './components/ReservationMangement/UserResrvation'
import { ProtectedAdminDashboard, ProtectedUserDashboard } from './components/UserMangement/ProtectedRoutes';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      fetchUserDetails();
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/users/me');
      console.log(response.data);
      setIsLoggedIn(true);
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user details:', error.response?.data?.message || error.message);
    }
  };

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Navigate to={isLoggedIn ? (userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard') : '/login'} />} />
          <Route path="/admin-dashboard" element={<ProtectedAdminDashboard />} />
          <Route path="/user-dashboard" element={<ProtectedUserDashboard />} />
          <Route path="/add-book" element={isLoggedIn && userRole === 'admin' ? <AddBook /> : <Navigate to="/login" />} />
          <Route path="/books/update/:id" element={isLoggedIn && userRole === 'admin' ? <UpdateBook /> : <Navigate to='/login' />} />
          <Route path="/delete-book/:id" element={isLoggedIn && userRole === 'admin' ? <DeleteBook /> : <Navigate to='/login' />} />
          <Route path="/books/search" element={<SearchBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />
          <Route path="/reserve-book" element={isLoggedIn && userRole === 'user' ? <ReserveBook /> : <Navigate to='/login' />} />
          <Route path="/user-reservations" element={isLoggedIn && userRole === 'user' ? <UserReservations /> : <Navigate to='/login' />} />
          <Route path="/view-reservations" element={isLoggedIn && userRole === 'admin' ? <ViewReservations /> : <Navigate to='/login' />} />
          <Route path="/cancel-reservation/:reservationId" element={isLoggedIn ? <CancelReservation /> : <Navigate to='/login' />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to='/login' />} />
          <Route path="/borrow-book" element={isLoggedIn && userRole === 'user' ? <BorrowBook /> : <Navigate to='/login' />} />
          <Route path="/return-book/:id" element={isLoggedIn && userRole === 'user' ? <ReturnBook /> : <Navigate to='/login' />} />
          <Route path="/overdue-books" element={isLoggedIn && userRole === 'user' ? <OverdueBooks /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
