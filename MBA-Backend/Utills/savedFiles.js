const Theatre = require('../Models/Theatre')

const Movies = require('../Models/Movies')

exports.addTheatre = async (req, res) => {
  let theatreObject = {
    name: req.body.name,
    city: req.body.city,
    description: req.body.description,
    pinCode: req.body.pinCode,
  }

  try {
    if (!theatreObject) {
      res.send('Please fill all fields to add a theatre...').status(400)
    } else if (theatreObject) {
      Theatre.create(theatreObject)
      res.send('A Theatre is added successfully...' + theatreObject).status(200)
    }
  } catch (error) {
    res.send('error occured in add a theatre...' + error.message).status(500)
  }
}

exports.AllTheatres = async (req, res) => {
  const Theatres = await Theatre.find()
  if (!Theatres) {
    res.send('No Theatres found in DB...').status(400)
  } else if (Theatres) {
    res.send(Theatres).status(200)
  }
}

exports.getAllTheatres = async (req, res) => {
  const queryObj = {}

  if (req.query.name != undefined) {
    queryObj.name = req.query.name
  }
  if (req.query.city != undefined) {
    queryObj.city = req.query.city
  }
  if (req.query.pinCode != undefined) {
    queryObj.pinCode = req.query.pinCode
  }
  const theatres = await Theatre.find(queryObj)
  res.status(200).send(theatres)
}

exports.getTheatreById = async (req, res) => {
  const enteredTheatreId = req.params.theatreId

  const theatre = await Theatre.findOne({ _id: enteredTheatreId })
  res.send(theatre).status(200)
}

exports.updateTheatre = async (req, res) => {
  const enteredTheatreId = req.params.theatreId

  try {
    const savedTheatre = await Theatre.findOne({ _id: enteredTheatreId })

    if (!savedTheatre) {
      return res.status(400).send({
        message: "Theatre want to update is doesn't exist in DB...",
      })
    }

    savedTheatre.name =
      req.body.name != undefined ? req.body.name : savedTheatre.name
    savedTheatre.description =
      req.body.description != undefined
        ? req.body.description
        : savedTheatre.description
    savedTheatre.city =
      req.body.city != undefined ? req.body.city : savedTheatre.city
    savedTheatre.pinCode =
      req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode

    var updatedTheatre = await savedTheatre.save()

    res.send(updatedTheatre).status(200)
  } catch (error) {
    res.send('Error occured in updating a Theatre...' + error.message)
  }
}

exports.deleteTheatre = async (req, res) => {
  const enteredTheatreId = req.params.theatreId

  await Theatre.deleteOne({
    _id: enteredTheatreId,
  })
  res.status(200).send({
    message: ' one of a Theatre was Successfully deleted .... ',
  })
}

// exports.addMoviesInTheatre = async (req,res) => {

//       let enteredTheatreId = req.params.theatreId;

//       try {

//     const savedTheatre = await Theatre.findOne({ _id: enteredTheatreId});

//     movieIds = req.body.movieIds;

//     if (req.body) {
//         movieIds.forEach(movieId => {
//             savedTheatre.movies.push(movieId);
//         });
//     } else {
//         savedMovieIds = savedTheatre.movies;

//         movieIds.forEach(movieId => {
//             savedMovieIds = savedMovieIds.filter(smi => smi != movieId);
//         });
//         savedTheatre.movies = savedMovieIds;
//     }

//     await savedTheatre.save();
//     res.status(200).send(savedTheatre);

// }

//        catch(error) {
//             res.send("error occured while add a movie in Theatre..." + error.message).status(500)
//       }

// }

exports.getMoviesInTheatre = async (req, res) => {
  // let enteredTheatreName = req.params.theatreName;
  // let enteredMovieId= req.params.movieId

  // const TheatreInDB = await Theatre.find({ name : enteredTheatreName})
  // const Movie = await Movies.find( { _id : enteredMovieId } )

  // try {

  //     if (!enteredTheatreName || !enteredMovieId) {
  //         res.send("Please Enter A Theatre Name and movie Idfor getting Movie details...").status(400)
  //         return;
  //    }
  //     if (enteredTheatreName && enteredMovieId) {

  //       if(TheatreInDB.movies.includes(Movie._id)){

  //         const responseBody = {
  //             // message: TheatreInDB.movies.includes(Movie._id) ? "Movie is present" : "Movie is not present"
  //             message : "Movie is Present"
  //         }

  //         res.send(responseBody).status(200)
  //       }

  //    }

  // } catch (error) {
  //      res.send("Error occured in finding Movies in Theatre..." + error.message).status(400)
  // }

  const savedTheatre = await Theatre.findOne({ name: req.params.theatreName })
  const savedMovie = await Movies.findOne({ _id: req.params.movieId })

  if (savedTheatre.movies.includes(savedMovie._id)) {
    const responseBody = {
      message: 'Movie is present',
    }
    res.status(200).send(responseBody)
  } else {
    res.send('Movie is not present...').status(400)
  }
}

exports.addMoviesInTheatreTwo = async (req, res) => {
  let enteredTheatreId = req.params.theatreId

  try {
    const savedTheatre = await Theatre.findOne({ _id: enteredTheatreId })

    movieIds = req.body.movieIds

    if (req.body) {
      movieIds.forEach((movieId) => {
        let foundMovie = Movies.find({ _id: movieId })

        if (foundMovie) {
          if (!savedTheatre.movies.includes(movieId)) {
            savedTheatre.movies.push(movieId)
            savedTheatre.save()
            res.status(200).send(savedTheatre)
          } else if (savedTheatre.movies.includes(movieId)) {
            res.send('Movie id is already present...').status(400)
          }
        }
      })
    }
  } catch (error) {
    res
      .send('error occured while add a movie in Theatre...' + error.message)
      .status(500)
  }
}

exports.removeMoviesFromTheatre = async (req, res) => {
  let enteredTheatreId = req.params.theatreId
  let enteredMovieId = req.params.movieId

  try {
    if (!enteredTheatreId || !enteredMovieId) {
      res
        .send(
          'Please enter a Valid theatreId for removing Movie from Theatre...'
        )
        .status(400)
    } else {
      const MovieInTheatre = await Theatre.findOne({ movies: enteredMovieId })
      const TheatreInDB = await Theatre.findOne({ _id: enteredTheatreId })

      if (TheatreInDB.movies.includes(MovieInTheatre)) {
        TheatreInDB.movies = !TheatreInDB.movies.includes(MovieInTheatre)
        TheatreInDB.save()
        res.send('Movie Removed Successfully')
      }
    }
  } catch (error) {
    res
      .send(
        'error occured while removing a movie from Theatre...' + error.message
      )
      .status(500)
  }
}

const theatreController = require('../Controllers/Theatre.controlelr')

module.exports = function (app) {
  app.get('/MovieBooking/api/v1/theatres', theatreController.getAllTheatres)
  // app.get("/MovieBooking/api/v1/theatres/:theatreId", theatreController.getTheatre);
  app.get('/MovieBooking/api/v1/alltheatres', theatreController.AllTheatres)
  app.get(
    '/MovieBooking/api/v1/MoviesInTheatre/:theatreName/:movieId',
    theatreController.getMoviesInTheatre
  )
  app.post('/MovieBooking/api/v1/theatres', theatreController.addTheatre)
  app.put(
    '/MovieBooking/api/v1/theatres/:theatreId',
    theatreController.updateTheatre
  )
  app.delete(
    '/MovieBooking/api/v1/theatres/:theatreId',
    theatreController.deleteTheatre
  )
  app.delete(
    '/MovieBooking/api/v1/theatres/:theatreId/:movieId',
    theatreController.removeMoviesFromTheatre
  )
  app.put(
    '/MovieBooking/api/v1/addMovieInTheatre/:theatreId',
    theatreController.addMoviesInTheatreTwo
  )
}