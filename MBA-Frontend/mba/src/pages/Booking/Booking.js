import './Booking.css'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { getMovie } from '../../api/movie'
import { getAllTheatres, getTheatre } from '../../api/theatre'
import Navbar from '../../components/Navbar/Navbar'
import Payment from '../../components/Payment/Payment'

const seats = Array.from({ length: 8 * 8 }, (_, index) => index)

const Booking = () => {
  const { movieid: movieId } = useParams()
  const { theatreid: theatreId } = useParams()
  const [pageLoaded, setPageLoaded] = useState(false)

  const [selectedMovieId, setSelectedMovieId] = useState(movieId)
  const [selectedTheatreId, setSelectedTheatreId] = useState(theatreId)

  const [selectedMovie, setSelectedMovie] = useState({})
  const [selectedTheatre, setSelectedTheatre] = useState({})

  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([10, 12, 50, 33, 28, 47])
  const [moviePrice, setMoviePrice] = useState(250)

  const navigate = useNavigate()

  const init = async () => {
    try {
      await getAllTheatres()
    } catch (error) {
      navigate('/login')
    }
    const response = await getMovie(selectedMovieId)
    setSelectedMovie(response.data[0])

    const theatreResponse = await getTheatre(selectedTheatreId)
    setSelectedTheatre(theatreResponse.data)

    setPageLoaded(true)
  }

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    init()
  }, [])

  const render = () => {
    return (
      <>
        <div className="App bg-black backg">
          <h2 className="fw-bold text-light">{selectedMovie.name}</h2>
          <ShowCase />
          <Cinema
            selectedSeats={selectedSeats}
            occupiedSeats={occupiedSeats}
            onSelectedSeatsChange={(selectedSeats) =>
              setSelectedSeats(selectedSeats)
            }
          />
          <p className="info">
            You have selected{' '}
            <span className="fw-bold">{selectedSeats.length}</span> seats for
            the price of{' '}
            <span className="fw-bold">{selectedSeats.length * moviePrice}</span>
            $
          </p>
        </div>
        <Payment
          noOfSeats={selectedSeats.length}
          movie={selectedMovie}
          theatre={selectedTheatre}
        />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="App bg-black backg">
        {pageLoaded ? render() : <h1>"Loading data..."</h1>}
      </div>
    </>
  )
}

const Cinema = ({ selectedSeats, onSelectedSeatsChange, occupiedSeats }) => {
  const handleSelectedState = (seat) => {
    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      )
    } else {
      onSelectedSeatsChange([...selectedSeats, seat])
    }
  }
  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = occupiedSeats.includes(seat)
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied'
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            />
          )
        })}
      </div>
    </div>
  )
}
const ShowCase = () => {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" />
        <small>Available</small>
      </li>
      <li>
        <span className="seat selected" />
        <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" />
        <small>Occupied</small>
      </li>
    </ul>
  )
}
export default Booking