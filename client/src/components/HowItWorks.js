import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/HowItWorks.css";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="how-it-works">
        <div className="how-it-works-header">
          <h2>How It Works</h2>
          <p>Follow these simple steps to get started!</p>
        </div>

        <div className="steps">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-content">
              <div className="step-text">
                <div className="step-number">Step 1</div>
                <h3>Contact Upload</h3>
                <p>
                  Upload your contact list to our platform to get started with sending your emails.
                  Make sure your list is in a CSV format.
                </p>
                <button onClick={() => navigate("/uploadContacts")}>Upload Contacts</button>
              </div>
              <div className="step-gif">
                <img src="path/to/contact-upload.gif" alt="Contact Upload" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card reverse">
            <div className="step-content">
              <div className="step-text">
                <div className="step-number">Step 2</div>
                <h3>Email Template</h3>
                <p>
                  Create a personalized email template that you want to send to your contacts.
                  Add subject lines, body content, and any attachments if needed.
                </p>
                <button onClick={() => navigate("/EmailTemp")}>Create Email Template</button>
              </div>
              <div className="step-gif">
                <img src="path/to/email-template.gif" alt="Email Template" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-content">
              <div className="step-text">
                <div className="step-number">Step 3</div>
                <h3>Done</h3>
                <p>
                  Once you’ve uploaded the contacts and created your email template, you’re ready to go!
                  Sit back and let us send your emails.
                </p>
                <button onClick={() => navigate("/sendEmails")}>Send Emails</button>
              </div>
              <div className="step-gif">
                <img src="path/to/done.gif" alt="Done" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
