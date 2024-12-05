const express = require('express');
const EmailTemplate = require('../Models/EmailTemplate');
const router = express.Router();

router.post('/saveTemplate', async (req, res) => {
  try {
    const { templateName, subject, body, attachments } = req.body;

    const newTemplate = new EmailTemplate({
      templateName,
      subject,
      body,
      attachments,
    });

    await newTemplate.save();

    res.status(200).json({ message: 'Template saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving template' });
  }
});

module.exports = router;
