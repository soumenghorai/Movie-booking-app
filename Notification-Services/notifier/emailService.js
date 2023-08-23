const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: 'gmail',
  debug: true,
  auth: {
    user: 'soumenghorai2802@gmail.com',
    pass: 'quqrablegubcurhh',
  },
})