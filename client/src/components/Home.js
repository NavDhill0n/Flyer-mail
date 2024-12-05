import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="intro-card">
        <div className="intro-text">
          <h2>Welcome to Flyer!</h2>
          <p>
            Optimize your email experience with our free bulk email service! Effortlessly reach your entire audience with engaging marketing emails, backed by robust deliverability tools and seamless automation. We're dedicated to helping you send impactful emails without the stress.
          </p>
          <button
            className="try-free"
            tabIndex={0} // Ensure focus
            onMouseEnter={(e) => e.target.focus()} // Focus on hover
            onClick={() => {
              console.log("Navigating to /ContactUpload...");
              navigate("/ContactUpload");
            }}
          >
            Try For Free
          </button>
        </div>
        <div className="intro-gif">
          <img
            src={"/intro.gif"}
            alt="Flyer Demo GIF"
            className="gif"
            style={{ zIndex: 1 }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
