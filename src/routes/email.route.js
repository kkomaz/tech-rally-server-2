const express = require('express');
const config = require('../config');
const nodemailer = require('nodemailer');
const Email = require('../models/email.model');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  }
});

router.post('/send-contact-2', (req, res, next) => {
  res.send({ hello: true });
});

router.post('/send-contact', (req, res, next) => {
  const { body: { email, name, message } } = req;

  Email.findOne({ email }, (err, emailObj) => {
    if (err) return next(err);

    const mailOptions = {
      from: config.EMAIL,
      to: config.TO_EMAIL,
      subject: `Email sent via techrally.me ${name}, ${email}`,
      text: message,
    };

    if (!emailObj) {
      const newEmail = new Email({
        email,
        name,
      });

      newEmail.save((err) => {
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            res.status(error.responseCode).send({
              status: error.responseCode,
              text: 'Something went wrong!'
            });
          } else {
            console.log('Email sent: ' + info.response);
            res.send({ success: true });
          }
        });
      });
    } else {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          res.status(error.responseCode).send({
            status: error.responseCode,
            text: 'Something went wrong!'
          });
        } else {
          console.log('Email sent: ' + info.response);
          res.send({ success: true });
        }
      });
    }
  });
});

module.exports = router;