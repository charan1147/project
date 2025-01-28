import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function  Profile(){
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/users/profile', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }); 
        setProfile(response.data.user); 
      } catch (error) {
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Profile</h2>
      {profile && profile.name && profile.email ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading .... Data</p>
      )}
    </div>
  );
};

export default Profile;
