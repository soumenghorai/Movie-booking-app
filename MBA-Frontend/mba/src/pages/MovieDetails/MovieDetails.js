import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovie } from '../../api/movie'
import Navbar from '../../components/Navbar/Navbar'
import './MovieDetails.css'
import { getAllTheatres } from '../../api/theatre'

const MovieDetails = () => {
  const { movieid: movieId } = useParams()
  const [selectedMovieId, setSelectedMovieId] = useState(movieId)
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [movieDetails, setMovieDetails] = useState({})
  const [releaseStatus, setReleaseStatus] = useState(false)
  const [movieCast, setMovieCast] = useState([])

  const init = async () => {
    try {
      const results = await getAllTheatres()
      if (results) {
        setIsLoggedin(true)
      }
    } catch (error) {
      setIsLoggedin(false)
    }

    const response = await getMovie(selectedMovieId)
    console.log(response.data)
    setMovieDetails(response.data[0])
    setReleaseStatus(response.data[0].releaseStatus === 'RELEASED')
    setMovieCast(movieDetails.cast)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-light">
        <div className="box bg-black backg">
          <div className="container my-4 justify-content-center">
            <div className="row">
              <div className="col">
                <img
                  src={movieDetails.posterUrl}
                  alt="Poster"
                  className="card"
                  width={300}
                  height={450}
                />
              </div>
              <div className="col bg-light">
                <h2 className="fw-bolder">About the Movie</h2>
                <h3>{movieDetails.name}</h3>
                <h4>{movieDetails.director}</h4>
                <h4>Cast</h4>
                <h5>{movieDetails.cast}</h5>
                <div
                  className="text-center my-3"
                  style={{ display: isLoggedin ? 'block' : 'none' }}
                >
                  <Link
                    key={selectedMovieId}
                    className="text-decoration-non btn btn-lg btn-danger text-center"
                    to={
                      releaseStatus ? `/movieTheatre/${selectedMovieId}` : `#`
                    }
                  >
                    {releaseStatus ? 'Book Now' : 'Coming Soon'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetails