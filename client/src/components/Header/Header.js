import React from 'react';
import { useNavigate } from 'react-router-dom'; // Move this outside handleLogout
import NavBar from '../NavBar/NavBar'; 
import './Header.css'; 
import axios from 'axios';
import flyerLogo from '../../utils/flyerlogo.png';

const Header = () => {
  const navigate = useNavigate(); // Call this at the top level of the component

  const handleLogout = async () => {
    try {
      // Call logout API
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      
      // Clear token from local storage
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/'); // Use navigate here
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="logos">
        <img src={flyerLogo} alt="Logo" className="logo" />
      </div>
      <NavBar />
      <div className="navbar-right">
        <input type="text" className="search-box" placeholder="Search..." />
      </div>
      <nav className="nav-links">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
