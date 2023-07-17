const movieController = require('../controllers/movie.controller');
const {verifyMovieReqBody} = require('../middlewares');

module.exports = function (app) {
    app.get("/movieBooking/api/v1/movies", movieController.getAllMovies);
    app.get("/movieBooking/api/v1/movies/:id", movieController.getMovieById);
    app.post("/movieBooking/api/v1/movies", [verifyMovieReqBody.validateMovieRequestBody], movieController.createMovie);
    app.put("/movieBooking/api/v1/movies/:id", [verifyMovieReqBody.validateMovieRequestBody], movieController.updateMovie);
    app.delete("/movieBooking/api/v1/movies/:id", movieController.deleteMovie)
}