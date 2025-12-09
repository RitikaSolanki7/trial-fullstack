
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  designation: {type: String},
  description: {type: String},
  imageUrl: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Client', ClientSchema);
