// src/pages/Done.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './styles/Done.css'; // Custom CSS for styling
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Done = () => {
  const navigate = useNavigate();

  // Handle navigation back to dashboard or another page
  const handleRedirect = () => {
    navigate('/Contactupload'); // Redirect to dashboard or another page
  };

  return (
    <>
    <Header />
    <div className="done">
      <h2>Emails Sent Successfully!</h2>
      <p>Your email template has been saved, and the emails have been successfully sent to all contacts.</p>
      <button onClick={handleRedirect} className="done-button">
        DONE
      </button>
      
    </div>
    <Footer />
    </>
  );
};

export default Done;
