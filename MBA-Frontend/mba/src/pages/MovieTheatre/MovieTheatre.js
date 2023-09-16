import { getAllTheatres } from '../../api/theatre'
import Navbar from '../../components/Navbar/Navbar'
import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const MovieThreatres = () => {
  const { movieid: movieId } = useParams()
  const [selectedMovieId, setSelectedMovieId] = useState(movieId)
  const [theatreDetails, setTheatreDetails] = useState([])
  const [pageLoaded, setPageLoaded] = useState(false)

  const init = async () => {
    let response = await getAllTheatres()
    console.log(response, response.data[0].movies.includes(selectedMovieId))
    setTheatreDetails(
      response.data.filter((theatre) =>
        theatre.movies.includes(selectedMovieId)
      )
    )
    console.log(theatreDetails)
    setPageLoaded(true)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="fw-bold text-dark text-center">Select Theatre</h2>

        {pageLoaded ? (
          <div>
            {theatreDetails.map((theatre) => {
              return (
                <Link to={`/movie/${selectedMovieId}/${theatre._id}`}>
                  {theatre.name}
                </Link>
              )
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default MovieThreatres