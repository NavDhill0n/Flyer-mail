// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: Add CSS for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/home">HOME</Link>
        </li>
        <li>
          <Link to="/howitworks">HOW IT WORKS</Link>
        </li>
        <li>
          <Link to="/pricingpage">PRICING</Link>
        </li>
        <li>
          <Link to="/contactus">CONTACT US</Link>
        </li>
        <li>
          <Link to="/help">HELP</Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default NavBar;
