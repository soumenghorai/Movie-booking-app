const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')
const mongoose = require('mongoose')

exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode
    }

    try{
        const theatre = await Theatre.create(theatreObject)
        return res.status(200).send(theatre);
    }catch(err){
        return res.status(500).send({
            message: "Some error occured while creating the theatre " + err
        })
    }
}

exports.getAllTheatres = async (req, res) => {
    const queryObject = {}

    if(req.query.name != undefined){
        queryObject.name = req.query.name
    }

    if(req.query.city != undefined){
        queryObject.city = req.query.city
    }

    if(req.query.pinCode != undefined){
        queryObject.pinCode = req.query.pinCode
    }

    try{
        var theatres = await Theatre.find(queryObject)

        if(req.query.moviedId != undefined){
            theatres = theatres.filter(t => t.movies.includes(req.query.moviedId))
        }

        return res.status(200).send(theatres)
    }catch(err){

       return res.status(500).send({
        message: "Some error occured during getting the theatres " + err
       }) 

    }
}

exports.getTheatreById = async (req, res) => {
    const theatre = await Theatre.findOne({
        _id: req.params.id
    })

    return res.status(200).send(theatre)
}

exports.updateTheatre = async (req, res) => {

    const savedTheatre = await Theatre.findOne({_id: req.params.id})

    if(!savedTheatre){
        return res.status(400).send({
            message: "The theatre you want to update doesn't exist!"
        })
    }

    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode

    var updatedTheatre = await savedTheatre.save()

    res.status(200).send(updatedTheatre)

}

exports.deleteTheatre = async (req, res) => {
    await Theatre.deleteOne({
        _id: req.params.id
    })

    res.status(200).send({
        message: "Succesfully delete theatre with id " + req.params.id
    })
}

exports.addMoviesToATheatre = async (req, res) => {
    var movieIds = []
    var validMovieIds = []
    try{
        //Check if the theatre exists
        const savedTheatre = await Theatre.findOne({ _id: req.params.id})

        if(!savedTheatre){
            return res.status(400).send({
                message: "The theatre where you want to add the movies doesn't exist!"
            })
        }

        //Add only those movies which are in the system
        validMovieIds = await getValidMovies(req.body.movieIds)
        
        if(validMovieIds.length > 0){
            savedTheatre.movies = validMovieIds
            const updatedTheatre = await savedTheatre.save()
            return res.status(200).send(updatedTheatre)
        }else{
            return res.status(400).send({
                message: "No valid movie to be added to the theatre"
            })
        }

    }catch(err){
        return res.status(500).send({
            message: "Some error occured while adding movied to the theatre " +  err
        })
    }

}

getValidMovies = async (movieIds) => {
    var validMovieIds = []

    if(movieIds != null && movieIds.length > 0){

        for(let i = 0; i < movieIds.length; i++){
            const savedMovie = await Movie.findOne({_id: movieIds[i]})
            if(savedMovie){
                validMovieIds.push(movieIds[i])
            }
        }
    }

    return validMovieIds
}

exports.checkMovieInATheatre = async (req, res) => {
    const savedTheatre = await Theatre.findOne({_id: req.params.theatreId})

    if(!savedTheatre){
        return res.status(400).send({
            message: "Theatre where you want to check the movie for doesn't exist!"
        })
    }

    const savedMovie = await Movie.findOne({_id: req.params.movieId})

    if(!savedMovie){
        return res.status(400).send({
            message: "The movie you are looking for doesn't exist!"
        })
    }

    return res.status(200).send({
        message: savedTheatre.movies.includes(req.params.movieId) ? "Movie is present" : "Movie is not present"
    })
}

