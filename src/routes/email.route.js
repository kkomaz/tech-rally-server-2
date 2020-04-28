const express = require('express');
const config = require('../config');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  }
});

router.post('/send-contact', (req, res, next) => {
  const { body: { email } } = req;
  console.log(email, 'email');

  const mailOptions = {
    from: config.EMAIL,
    to: config.TO_EMAIL,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  res.send({ success: true });
});

module.exports = router;