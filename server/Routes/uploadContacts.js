const express = require('express');
const router = express.Router();
const ContactList = require('../Models/ContactList'); // Adjust the path if necessary

// Route to upload contacts
router.post('/uploadContacts', async (req, res) => {
  try {
    const { contacts } = req.body; // Ensure 'contacts' is sent from the frontend as an array

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({ message: 'No contacts provided or invalid format.' });
    }

    // Insert all contacts into the database
    const savedContacts = await ContactList.insertMany(contacts, { ordered: false });

    res.status(200).json({
      message: 'Contacts uploaded successfully!',
      savedContacts,
    });
  } catch (error) {
    console.error(error);

    // Handle duplicate key error if unique constraints exist in your schema
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate email found during bulk insert. Please check your data.',
        details: error.writeErrors.map(err => err.errmsg),
      });
    }

    res.status(500).json({ error: 'Error uploading contacts' });
  }
});

module.exports = router;
