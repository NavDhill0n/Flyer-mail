import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axiosInstance from './axiosInstance'; // Import Axios instance
import './styles/EmailTemplate.css'; // Custom CSS for styling
import Header from './Header/Header';
import Footer from './Footer/Footer';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';

const EmailTemplate = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/saveTemplate', {
        templateName,
        subject,
        body,
        attachments: Array.from(attachments), // Convert FileList to array
      });
      console.log('Template saved:', response.data);
      navigate('/Done'); // Redirect after successful save
    } catch (error) {
      setError('Error saving template: ' + error.message);
    }
  };

  // Handle send emails
  const handleSendEmails = async () => {
    try {
      const response = await axios.post('http://localhost:5000/sendEmails/sendEmail');
      console.log('Emails sent:', response.data);
      navigate('/Done');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  // Insert placeholders into the body
  const insertPlaceholder = (placeholder) => {
    setBody(body + ` {${placeholder}}`);
  };

  return (
    <div>
      <Header />
      <div className="email-template">
        <div className="form-mail">
          <h2>Create Email Template</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="templateName">Template Name:</label>
            <input
              type="text"
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              required
              disabled={false}
            />

            <label htmlFor="subject">Email Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <label htmlFor="body">Email Body:</label>
            <ReactQuill
              value={body}
              onChange={setBody}
              placeholder="Use placeholders like {Name}, {Company}, {Email}"
            />

            <div className="placeholders">
              <span>Insert Placeholder:</span>
              <button type="button" onClick={() => insertPlaceholder('Name')}>Name</button>
              <button type="button" onClick={() => insertPlaceholder('Company')}>Company</button>
              <button type="button" onClick={() => insertPlaceholder('Email')}>Email</button>
              <button type="button" onClick={() => insertPlaceholder('Phone')}>Phone</button>
              <button type="button" onClick={() => insertPlaceholder('Position')}>Position</button>
            </div>

            <label htmlFor="attachments">Attachments:</label>
            <input
              type="file"
              id="attachments"
              onChange={handleFileChange}
              multiple
            />

            <button onClick={handleSendEmails}>Send Emails to All Contacts</button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="preview">
          <h3>Email Preview</h3>
          <div className="preview-content">
            <p><strong>Subject:</strong> {subject}</p>
            <div className="preview-body" dangerouslySetInnerHTML={{ __html: body }}></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailTemplate;
