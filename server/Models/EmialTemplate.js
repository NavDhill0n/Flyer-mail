const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  attachments: [String], // Store attachment file names or URLs
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
