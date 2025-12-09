
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  city: String
}, {timestamps: true});

module.exports = mongoose.model('Contact', ContactSchema);
