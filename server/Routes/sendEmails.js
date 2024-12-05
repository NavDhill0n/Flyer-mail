// server/routes/sendEmails.js
const express = require('express');
const router = express.Router();
const Contact = require('../Models/ContactList'); // Your Contact model
const Template = require('../Models/EmailTemplate'); // Your EmailTemplate model
const sendEmail = require('../utils/sendEmail'); // Email sending function

router.post('/sendEmail', async (req, res) => {
  try {
    // Get all contacts
    const contacts = await Contact.find({});
    
    // Get the saved template (assuming the template is stored in MongoDB)
    const template = await Template.findOne(); // You can adjust the query to get a specific template

    if (!template) {
      return res.status(400).json({ message: 'No email template found.' });
    }

    const { subject, body } = template;

    // Loop through each contact and send the email
    for (const contact of contacts) {
      const emailBody = body
        .replace('{Name}', contact.name)
        .replace('{Company}', contact.company)
        .replace('{Email}', contact.email)
        .replace('{Phone}', contact.phone)
        .replace('{Position}', contact.position);

      await sendEmail(subject, emailBody, contact.email);
    }

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails.' });
  }
});

module.exports = router;
