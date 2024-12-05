const express = require("express");
const router = express.Router();
const Contact = require("../Models/ContactModel");
const nodemailer = require("nodemailer");

// POST: Handle Contact Us submissions
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save contact form submission in MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Us" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin email address
      subject: "New Contact Us Submission",
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error handling contact us submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
