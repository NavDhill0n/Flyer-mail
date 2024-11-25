import React from 'react';
import './Footer.css';
import flyerLogo from '../../utils/flyerlogo.png';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic goes here
    console.log('Query submitted');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={flyerLogo} alt="Flyer Logo" className="footer-logo-img" />
          <p className="footer-logo-text">Flyer</p>
          <p className="footer-slogan">Simplifying Your Outreach</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/about" className="footer-link">About Us</a>
          <a href="/features" className="footer-link">Features</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaEnvelope /> support@flyer.com</p>
          <p><FaPhone /> +1 (123) 456-7890</p>
        </div>
        <div className="footer-query">
          <h4>Submit Your Query</h4>
          <form onSubmit={handleSubmit} className="query-form">
            <textarea
              className="query-field"
              placeholder="Enter your query here..."
              required
            ></textarea>
            <input
              type="email"
              className="contact-field"
              placeholder="Your Email or Contact Info"
              required
            />
            <button type="submit" className="query-submit">Submit</button>
          </form>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Flyer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
