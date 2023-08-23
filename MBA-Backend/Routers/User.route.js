const authJwt = require('../Middlewares/authJwt')
const UserController = require('../Controllers/User.controller')

module.exports = function (app) {
  app.get(
    '/MovieBooking/api/v1/Users',
    [authJwt.verifyToken, authJwt.isAdmin],
    UserController.getAllUsers
  )
  app.get(
    '/MovieBooking/api/v1/Users/:userId',
    [authJwt.verifyToken],
    UserController.getUserById
  )
  app.put(
    '/MovieBooking/api/v1/Users/:userId',
    [authJwt.verifyToken, authJwt.isAdmin],
    UserController.updateUseerDetails
  )
  app.delete(
    '/MovieBooking/api/v1/Users/:userId',
    [authJwt.verifyToken, authJwt.isAdmin],
    UserController.deleteUser
  )
}