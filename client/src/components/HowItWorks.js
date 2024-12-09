import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/HowItWorks.css";

const HowItWorks = () => {
  const navigate = useNavigate();
  const [contactAnimation, setContactAnimation] = useState(null);
  const [emailTemplateAnimation, setEmailTemplateAnimation] = useState(null);
  const [doneAnimation, setDoneAnimation] = useState(null);

  // Default options for Lottie animations
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Fetch animation JSON data
  useEffect(() => {
    const fetchAnimationData = async (fileName, setAnimation) => {
      try {
        const response = await fetch(`/${fileName}`); // Directly fetch from the public folder
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}`);
        }
        const data = await response.json();
        setAnimation(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
      }
    };

    fetchAnimationData("file.json", setContactAnimation);
    fetchAnimationData("mail.json", setEmailTemplateAnimation);
    fetchAnimationData("sent.json", setDoneAnimation);
  }, []);

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
                {contactAnimation ? (
                  <Lottie options={{ ...defaultOptions, animationData: contactAnimation }} />
                ) : (
                  <p>Loading animation...</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card reverse">
            <div className="step-content">
              <div className="step-gif">
                {emailTemplateAnimation ? (
                  <Lottie options={{ ...defaultOptions, animationData: emailTemplateAnimation }} />
                ) : (
                  <p>Loading animation...</p>
                )}
              </div>
              <div className="step-text">
                <div className="step-number">Step 2</div>
                <h3>Email Template</h3>
                <p>
                  Create a personalized email template that you want to send to your contacts.
                  Add subject lines, body content, and any attachments if needed.
                </p>
                <button onClick={() => navigate("/EmailTemp")}>Create Email Template</button>
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
                {doneAnimation ? (
                  <Lottie options={{ ...defaultOptions, animationData: doneAnimation }} />
                ) : (
                  <p>Loading animation...</p>
                )}
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
