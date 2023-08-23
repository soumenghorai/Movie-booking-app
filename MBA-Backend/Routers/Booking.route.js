const bookingController = require('../Controllers/Booking.controller')
const authJwt = require('../Middlewares/authJwt')
const verifyBookingReqBody = require('../Middlewares/verifyBookingReqBody')
module.exports = function (app) {
  app.get(
    '/MovieBooking/api/v1/bookings',
    [authJwt.verifyToken],
    bookingController.getAllBookings
  )
  app.get(
    '/MovieBooking/api/v1/bookings/:id',
    [authJwt.verifyToken],
    bookingController.getBookingById
  )
  app.post(
    '/MovieBooking/api/v1/bookings',
    [authJwt.verifyToken, verifyBookingReqBody.validateBookingRequestBody],
    bookingController.createBooking
  )
  app.put(
    '/MovieBooking/api/v1/bookings/:id',
    [authJwt.verifyToken],
    bookingController.updateBooking
  )
}