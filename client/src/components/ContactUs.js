import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status message

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/contact", formData);
      if (response.status === 200) {
        window.alert("Your message has been sent successfully!"); // Show alert
        navigate("/home"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="contact">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>Have questions or need help? We'd love to hear from you! Use the form below to get in touch with us.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>
            Email: <a href="mailto:support@flyer.com">support@flyer.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+1 234 567 890</a>
          </p>
          <p>Address: 123 Flyer Lane, Innovation City, IN 54321</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
