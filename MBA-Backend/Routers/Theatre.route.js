const theatreController = require('../Controllers/Theatre.controller')
const authJwt = require('../Middlewares/authJwt')

module.exports = function (app) {
  app.get(
    '/MovieBooking/api/v1/theatres',
    [authJwt.verifyToken],
    theatreController.getAllTheatres
  )
  // app.get("/MovieBooking/api/v1/theatres/:theatreId", theatreController.getTheatre);
  app.get(
    '/MovieBooking/api/v1/alltheatres',
    [authJwt.verifyToken],
    theatreController.AllTheatres
  )
  app.get(
    '/MovieBooking/api/v1/MoviesInTheatre/:theatreName/:movieId',
    [authJwt.verifyToken],
    theatreController.getMoviesInTheatre
  )
  app.post(
    '/MovieBooking/api/v1/theatres',
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.addTheatre
  )
  app.put(
    '/MovieBooking/api/v1/theatres/:theatreId',
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.updateTheatre
  )
  app.delete(
    '/MovieBooking/api/v1/theatres/:theatreId',
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.deleteTheatre
  )
  app.delete(
    '/MovieBooking/api/v1/theatres/deleteMovie/:theatreId/:movieId',
    [authJwt.verifyToken, authJwt.isAdmin],
    theatreController.removeMoviesFromTheatre
  )
  app.put(
    '/MovieBooking/api/v1/addMovieInTheatre/:theatreId',
    [authJwt.verifyToken, authJwt.isAdmin],
    theatreController.addMoviesInTheatreTwo
  )
}