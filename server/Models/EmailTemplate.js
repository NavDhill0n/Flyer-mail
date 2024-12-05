const mongoose = require('mongoose');

// Define the schema for the email template
const emailTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  attachments: [String], // Store attachment file names or URLs
});

// Check if the model already exists before defining it again
const EmailTemplate = mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
