import React, { useState } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// Add animation file
import "./styles/HelpPage.css";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqData] = useState([
    { question: "How do I upload my contact list?", answer: "Go to the Upload Contacts page..." },
    { question: "Can I customize email templates?", answer: "Yes! Navigate to the Create Email Template page..." },
    { question: "What should I do if my emails are not delivered?", answer: "Check the email addresses or reach out to support..." },
    // Add more FAQs
  ]);

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="help-page">
        <div className="help-card">
          <div className="help-page-header">
            <h2>Help Center</h2>
            <p>Find answers to your questions and learn how to use our platform effectively.</p>
          </div>

          <div className="faq-search">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            
          </div>

          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="faq">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="help-resources">
            <h3>Additional Resources</h3>
            <p>
              Need more help? Visit our <a href="/how-it-works">How It Works</a> page or contact us directly via the{" "}
              <a href="/contact-us">Contact Us</a> page.
            </p>
          </div>

          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpPage;
