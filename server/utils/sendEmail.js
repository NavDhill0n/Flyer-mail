// server/utils/sendEmail.js
const nodemailer = require('nodemailer');

// Create a reusable transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with other services
  auth: {
    user: 'flyermail01@gmail.com', // Your email
    pass: 'npidzqucnaqjwpby', // Your email password or App Password
  },
});

// Function to send email
const sendEmail = async (subject, body, to) => {
  const mailOptions = {
    from: 'flyermail01@gmail.com',
    to: to, // Send email to the contact
    subject: subject,
    html: body, // Send the email body as HTML
  };

  try {
    console.log(`Attempting to send email to ${to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = sendEmail;
