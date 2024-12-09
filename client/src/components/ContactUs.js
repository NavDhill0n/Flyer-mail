import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
    preferredContact: "email",
  });
  const [status, setStatus] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, message, phone } = formData;
    if (!name || !email || !message) {
      setNotification("All fields are required.");
      return false;
    }
    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setNotification("Please enter a valid email address.");
      return false;
    }
    // Phone number validation (optional, but if entered, it should be valid)
    if (phone && !/^\+?\d{10,15}$/.test(phone)) {
      setNotification("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status message
    setNotification("");
    
    if (!validateForm()) return;

    setIsLoading(true);
    setIsButtonDisabled(true); // Disable submit button

    try {
      const response = await axios.post("http://localhost:5000/contact", formData);
      if (response.status === 200) {
        setNotification("Your message has been sent successfully!");
        setStatus("success");
        window.alert("Your message has been sent successfully!"); // Show alert
        navigate("/home"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNotification("An error occurred. Please try again.");
      setStatus("error");
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false); // Re-enable the submit button
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
          <div className="input-container">
            <FaEnvelope />
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="email">Your Email</label>
          <div className="input-container">
            <FaEnvelope />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="phone">Your Phone Number (Optional)</label>
          <div className="input-container">
            <FaPhoneAlt />
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="subject">Subject</label>
          <div className="input-container">
            <input
              type="text"
              id="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="preferredContact">Preferred Contact Method</label>
          <select
            id="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>

          <button type="submit" disabled={isButtonDisabled}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
        
        {notification && (
          <div className={`notification ${status}`}>
            {notification}
          </div>
        )}
        
        <div className="get-in-touch-container">
          <h2>Get in Touch</h2>
          <div className="contact-card">
            <div className="contact-item">
              <FaPhoneAlt />
              <h4>Call Us</h4>
              <p>+91 (9876) 543-210</p>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <h4>Email Us</h4>
              <p>flyermail01@gmail.com</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <h4>Visit Us</h4>
              <p>Amritsar, Punjab</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="fab" onClick={() => window.scrollTo(0, 0)}>
        ↑
      </div>
    </>
  );
};

export default ContactUs;
