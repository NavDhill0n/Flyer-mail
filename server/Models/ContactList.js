const mongoose = require('mongoose');

// Check if the model already exists in mongoose.models
const ContactList = mongoose.models.ContactList || mongoose.model('ContactList', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Ensuring email uniqueness
  company: { type: String },
  phone: { type: String }, // Optional: Regex for phone validation
  position: { type: String },
}, { timestamps: true })); // Automatically add createdAt and updatedAt fields

module.exports = ContactList;
