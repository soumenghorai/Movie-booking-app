const movieController = require('../controllers/movie.controller');
const { varifyMovieReqBody } = require('../middlewares');

module.exports = function (app) {
    app.get("movieBooking/app/v1/movies", movieController.getAllMovies);
    app.get("movieBooking/app/v1/movies/:id", movieController.getMoviesById);
    app.post("movieBooking/app/v1/movies", [varifyMovieReqBody.validateMovieRequestBody], movieController.createMovie);
    app.put("movieBooking/app/v1/movies", [varifyMovieReqBody.validateMovieRequestBody], movieController.updateMovie);
    app.delete("movieBooking/app/v1/movies/:id", movieController.deleteMovie);
}

