const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmailSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  }
});

module.exports = mongoose.model('Email', EmailSchema);
