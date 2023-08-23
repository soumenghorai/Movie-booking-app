const constants = require('../utils/constants');

validateMovieRequestBody = async (req, res, next) => {

    //Validate if the movie name is provided - return HTTP 400
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! Movie name is not provided."
        })
    }

    //Validate if releaseStatus is provided - return HTTP 400
    if(!req.body.releaseStatus){
       return res.status(400).send({
        message: "Failed! Movie release status is not provided."
       }) 
    }

    //Validate the releaseStatus of the movie: "RELEASED", "BLOCKED", "UNRELEASED" - return HTTP 400
    const releaseStatus = req.body.releaseStatus;
    const releaseStatusTypes = [constants.releaseStatus.unreleased, constants.releaseStatus.released, constants.releaseStatus.blocked];
    if(!releaseStatusTypes.includes(releaseStatus)){
        return res.status(400).send({
            message: "Failed! Movie release status provided is invalid. Valid values are UNRELEASED | RELEASED | BLOCKED."
        })
    }

    //Validate if the releaseDate is provied - return HTTP 400
    if(!req.body.releaseDate){
        return res.status(400).send({
            message: "Failed! Movie release date is not provided."
        })
    }

    //Validate if the director is provided - return HTTP 400
    if(!req.body.director){
        return res.status(400).send({
            message: "Failed! Movie director is not provided."
        })
    }

    next();
}

const verifyMovieReqBody = {
    validateMovieRequestBody: validateMovieRequestBody
}

module.exports = verifyMovieReqBody;