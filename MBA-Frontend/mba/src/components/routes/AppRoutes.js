import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './../../pages/Auth/Auth'
import LandingPage from '../../pages/LandingPage/LandingPage'
import Admin from './../../pages/Admin/Admin'
import Client from '../../pages/Client/Client'
import Booking from '../../pages/Booking/Booking'
import MovieDetails from '../../pages/MovieDetails/MovieDetails'
import MovieThreatres from '../../pages/MovieTheatre/MovieTheatre'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/client" element={<Client />} />
        <Route exact path="/movie/:movieid/:theatreid" element={<Booking />} />
        <Route
          exact
          path="/movie/:movieid/details"
          element={<MovieDetails />}
        />
        <Route
          exact
          path="/movieTheatre/:movieid"
          element={<MovieThreatres />}
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes