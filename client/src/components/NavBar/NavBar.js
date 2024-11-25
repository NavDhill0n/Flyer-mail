// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: Add CSS for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/how-it-works">HOW IT WORKS</Link>
        </li>
        <li>
          <Link to="/pricing">PRICING</Link>
        </li>
        <li>
          <Link to="/contact-us">CONTACT US</Link>
        </li>
        <li>
          <Link to="/help">HELP</Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default NavBar;
