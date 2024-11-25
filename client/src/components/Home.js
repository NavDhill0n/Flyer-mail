import React from "react";
import Header from "./Header/Header";
import "./styles/Home.css";

import Footer from "./Footer/Footer";

const Home = () => { // Fix: Add "= () =>" to define the function properly
  return (
    <>
      <Header />
      <div className="intro-card">
        <div className="intro-text">
          <h2>Welcome to Flyer!</h2>
          <p>
            Optimize your email experience with our free bulk email service! Effortlessly reach your entire audience with engaging marketing emails, backed by robust deliverability tools and seamless automation. We're dedicated to helping you send impactful emails without the stress.
          </p>
          <a href="/contactupload" className="try-free-button">Try For Free</a>
        </div>
        <div className="intro-gif">
          <img 
            src={'/intro.gif'} // Add the gif name and path
            alt="Flyer Demo GIF"
            className="gif"
          />
        </div>
      
      </div>
      <Footer/>
    </>
  );
};

export default Home;
