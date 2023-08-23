const paymentController = require('../Controllers/Payment.controller')
const authJwt = require('../Middlewares/authJwt')

module.exports = function (app) {
  app.get(
    '/MovieBooking/api/v1/payments',
    [authJwt.verifyToken],
    paymentController.getAllPayments
  )
  app.get(
    '/MovieBooking/api/v1/payments/:id',
    [authJwt.verifyToken],
    paymentController.getPaymentById
  )
  app.post(
    '/MovieBooking/api/v1/payments',
    [authJwt.verifyToken],
    paymentController.createPayment
  )
}