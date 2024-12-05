import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Papa from 'papaparse';
import axiosInstance from './axiosInstance'; // Import Axios instance
import Header from './Header/Header';
import './styles/ContactUpload.css'; // Optional: Custom CSS for styling
import Footer from './Footer/Footer';

const ContactUpload = () => {
    const [contacts, setContacts] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Function to parse CSV file using PapaParse
    const handleFileUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true, // Treat the first row as headers
                skipEmptyLines: true,
                complete: (result) => {
                    setContacts(result.data); // Store parsed contacts in state
                    console.log('Parsed Contacts:', result.data);
                },
                error: (err) => {
                    setError('Error parsing CSV file: ' + err.message);
                }
            });
        } else {
            setError('Please select a file to upload.');
        }
    };
    

    // Function to send contacts to the backend and then redirect
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post('/uploadContacts', { contacts });
            console.log('Response from server:', response.data);
            navigate('/EmailTemplate'); // Redirect to EmailTemplate page
        } catch (error) {
            setError('Error uploading contacts: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="contact-upload">
                {/* Form Container on the Left */}
                <div className="contact">
                    <h2>Upload Contact List</h2>
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <button  className = "parse"  onClick={handleFileUpload}>Parse CSV</button>
                    <button className="submit" onClick={handleSubmit}>Submit to Server</button>
                    {error && <p className="error-message">{error}</p>}
                    {contacts.length > 0 && (
                        <div className="contacts-preview">
                            <h3>Preview of Contacts:</h3>
                            <ul>
                                {contacts.map((contact, index) => (
                                    <li key={index}>{JSON.stringify(contact)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Video Container on the Right */}
                <div className="video">
                    <video autoPlay loop muted>
                        <source src="\contactupload.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUpload;
