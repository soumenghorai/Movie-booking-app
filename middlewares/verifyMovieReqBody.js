validateMovieRequestBody = async (req, res, next) => {
    
    // validate if the movie name is provided - return HTTP 400

    // validate if the movie name is provided - return HTTP 400

    // validate the releaseStatus of the movie: "RELEASED", "BLOCKED", "UNRELEASED" - return HTTP 400

    // validate if the releaseDate is provided - return HTTP 400

    // validate if the director is provided - return HTTP 400

    next();
}

const varifyMovieReqBody = {
    validateMovieRequestBody: validateMovieRequestBody
}

module.exports = varifyMovieReqBody;