import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/HelpPage.css";

const HelpPage = () => {
  return (
    <>
      <Header />
      <div className="help-page">
        <div className="help-card">
          <div className="help-page-header">
            <h2>Help Center</h2>
            <p>Find answers to your questions and learn how to use our platform effectively.</p>
          </div>

          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq">
              <h4>1. How do I upload my contact list?</h4>
              <p>
                Go to the <strong>Upload Contacts</strong> page and upload your list in CSV format.
                Ensure that your file contains valid email addresses.
              </p>
            </div>

            <div className="faq">
              <h4>2. Can I customize email templates?</h4>
              <p>
                Yes! Navigate to the <strong>Create Email Template</strong> page, where you can
                design and save personalized email templates with subject lines and attachments.
              </p>
            </div>

            <div className="faq">
              <h4>3. What should I do if my emails are not delivered?</h4>
              <p>
                If your emails are not being delivered, check the email addresses in your contact
                list for errors or reach out to our support team at{" "}
                <a href="mailto:support@flyer.com">support@flyer.com</a>.
              </p>
            </div>
          </div>

          <div className="help-resources">
            <h3>Additional Resources</h3>
            <p>
              Need more help? Visit our <a href="/how-it-works">How It Works</a> page for detailed
              instructions or contact us directly via the <a href="/contact-us">Contact Us</a> page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpPage;
