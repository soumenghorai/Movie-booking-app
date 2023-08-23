const Movies = require('../Models/Movies')

exports.createMovie = async (req, res) => {
  const movieObject = {
    name: req.body.name,
    description: req.body.description,
    casts: req.body.casts,
    trailerUrl: req.body.trailerUrl,
    posterUrl: req.body.posterUrl,
    language: req.body.language,
    releaseDate: req.body.releaseDate,
    director: req.body.releaseDate,
    releaseStatus: req.body.releaseStatus,
  }
  try {
    if (!movieObject) {
      res.send('please fill all details to add A movie in DB...').status(200)
    } else if (movieObject) {
      await Movies.create(movieObject)
      res.send('A Movies is Successfully added in DB...').status(500)
    }
  } catch (error) {
    console.log('error occured in createMovies...' + error)
    res
      .send('Some error occured in CreateMovies...' + error.message)
      .status(400)
  }
}

exports.getAllMovies = async (req, res) => {
  const AllMovies = await Movies.find()

  try {
    if (AllMovies) {
      res.send(AllMovies).status(200)
    } else if (!AllMovies) {
      res.send('No Movies Found In DB...').status(400)
    }
  } catch (error) {
    res.send('error occured in getAllMovies...' + error.message).status(500)
  }
}

exports.getMovieById = async (req, res) => {
  let givenMovieId = req.params.movieId

  try {
    if (!givenMovieId) {
      res.send('please enter a valid movieId for search a movie...').status(201)
      return
    } else {
      let findMovie = await Movies.find({ _id: givenMovieId })
      if (!findMovie) {
        res.send('No Movie Found In DB with given movieId...').status(201)
      } else if (findMovie) {
        res.send(findMovie).status(200)
      }
    }
  } catch (error) {
    res
      .send('some error occured in find Movies By Id...' + error.message)
      .status(400)
  }
}

exports.updateMovie = async (req, res) => {
  const savedMovie = await Movies.findOne({ _id: req.params.id })

  if (!savedMovie) {
    res.status(404).send({
      message: 'Movie not found',
    })
  }

  savedMovie.name = req.body.name != undefined ? req.body.name : savedMovie.name
  savedMovie.description =
    req.body.description != undefined
      ? req.body.description
      : savedMovie.description
  savedMovie.casts =
    req.body.casts != undefined ? req.body.casts : savedMovie.casts
  savedMovie.director =
    req.body.director != undefined ? req.body.director : savedMovie.director
  savedMovie.trailerUrl =
    req.body.trailerUrl != undefined
      ? req.body.trailerUrl
      : savedMovie.trailerUrl
  savedMovie.posterUrl =
    req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl
  savedMovie.language =
    req.body.language != undefined ? req.body.language : savedMovie.language
  savedMovie.releaseDate =
    req.body.releaseDate != undefined
      ? req.body.releaseDate
      : savedMovie.releaseDate
  savedMovie.releaseStatus =
    req.body.releaseStatus != undefined
      ? req.body.releaseStatus
      : savedMovie.releaseStatus

  try {
    const updatedMovie = await savedMovie.save()
    res.status(200).send(updatedMovie)
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    })
  }
}

exports.deleteMovie = async (req, res) => {
  try {
    await Movies.deleteOne({ _id: req.params.id })
    res.status(200).send({
      message: 'Movie deleted successfully with id ' + req.params.id + '.',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      message: 'Internal Server Error',
    })
  }
}