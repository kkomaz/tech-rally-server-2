require('dotenv').config();

module.exports = {
  AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}