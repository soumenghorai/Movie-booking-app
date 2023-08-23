const Theatre = require('../Models/Theatre')
const userTypes = require('./../Utills/Constants/userType').userTypesObject
  .userTypes
const Movies = require('../Models/Movies')
const Users = require('../Models/Users')
const { sendEmail } = require('../Utills/NotificationClient')

exports.addTheatre = async (req, res) => {
  let theatreObject = {
    name: req.body.name,
    city: req.body.city,
    description: req.body.description,
    pinCode: req.body.pinCode,
    ownerId: req.body.ownerId,
  }

  const admin = await Users.findOne({ userType: userTypes.admin })
  const client = await Users.findOne({ _id: theatreObject.ownerId })

  try {
    if (!theatreObject) {
      res.status(400).send('Please fill all fields to add a theatre...')
    } else if (theatreObject) {
      const theatre = Theatre.create(theatreObject)
      res.status(200).send('A Theatre is added successfully...' + theatreObject)
      sendEmail(
        theatre._id,
        'New theatre created with the theatre id:' + theatre._id,
        JSON.stringify(theatreObject),
        [admin.email, client.email],
        'mba-no-reply@mba.com'
      )
    }
  } catch (error) {
    res.status(500).send('error occured in add a theatre...' + error.message)
  }
}

exports.AllTheatres = async (req, res) => {
  const Theatres = await Theatre.find()
  if (!Theatres) {
    res.status(400).send('No Theatres found in DB...')
  } else if (Theatres) {
    res.status(200).send(Theatres)
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
  res.status(200).send(theatre)
}

exports.updateTheatre = async (req, res) => {
  const enteredTheatreId = req.params.theatreId

  const admin = await Users.findOne({ userType: userTypes.admin })

  try {
    const savedTheatre = await Theatre.findOne({ _id: enteredTheatreId })
    const client = await Users.findOne({ _id: savedTheatre.ownerId })
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

    res.status(200).send(updatedTheatre)

    console.log(admin, client)
    sendEmail(
      savedTheatre._id,
      'Theatre updated with the theatre id:' + savedTheatre._id,
      JSON.stringify(updatedTheatre),
      [admin.email, client.email],
      'mba-no-reply@mba.com'
    )
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send('Error occured in updating a Theatre...' + error.message)
  }
}

exports.deleteTheatre = async (req, res) => {
  const enteredTheatreId = req.params.theatreId
  const admin = await Users.findOne({ userType: userTypes.admin })
  const savedTheatre = await Theatre.findOne({ _id: enteredTheatreId })
  const client = await Users.findOne({ _id: savedTheatre.ownerId })
  await Theatre.deleteOne({
    _id: enteredTheatreId,
  })
  res.status(200).send({
    message: ' one of a Theatre was Successfully deleted .... ',
  })
  sendEmail(
    savedTheatre._id,
    'Theatre deleted with the theatre id:' + savedTheatre._id,
    JSON.stringify(savedTheatre),
    [admin.email, client.email],
    'mba-no-reply@mba.com'
  )
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
    res.status(400).send('Movie is not present...')
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
            res.status(400).send('Movie id is already present...')
          }
        }
      })
    }
  } catch (error) {
    res
      .status(500)
      .send('error occured while add a movie in Theatre...' + error.message)
  }
}

exports.removeMoviesFromTheatre = async (req, res) => {
  let enteredTheatreId = req.params.theatreId
  let enteredMovieId = req.params.movieId

  try {
    if (!enteredTheatreId) {
      res
        .status(400)
        .send(
          'Please enter a Valid theatreId for removing Movie from Theatre...'
        )
    } else {
      const TheatreInDB = await Theatre.findOne({ _id: enteredTheatreId })

      if (TheatreInDB.movies.includes(enteredMovieId)) {
        TheatreInDB.deleteOne(enteredMovieId)
        TheatreInDB.save()
        res.send('Movie Removed Successfully')
      }
    }
  } catch (error) {
    res
      .status(500)
      .send(
        'error occured while removing a movie from Theatre...' + error.message
      )
  }
}