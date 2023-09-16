const express = require('express')
const bodyParser = require('body-parser')
const serverConfig = require('./Configs/server.config')
const dbConfig = require('./Configs/db.config')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Movies = require('./Models/Movies')
const Users = require('./Models/Users')
const Theatre = require('./Models/Theatre')
const Bookings = require('./Models/Bookings')
const Payments = require('./Models/Payments')
const Constants = require('./Utills/Constants/userType')
const cors = require('cors')
const expressApp = express()
expressApp.use(cors())
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on('error', () => {
  console.log('Error while connecting to DB')
})
db.once('open', () => {
  console.log('Successfully Connected to mongo DB')
  init()
})

/**
 * This function will initialize the state of the move booking database
 */
async function init() {
  await Users.collection.drop()
  const user1 = await Users.create({
    name: 'Soumen',
    userId: 'admin',
    email: 'soumenghorai2802@gmail.com',
    userType: 'ADMIN',
    password: bcrypt.hashSync('Welcome', 8),
  })
  const user2 = await Users.create({
    name: 'Soumen',
    userId: 'customer',
    email: 'soumenghorai1212@gmail.com',
    userType: 'CUSTOMER',
    password: bcrypt.hashSync('Welcome', 8),
  })
  await Movies.collection.drop()
  const movie1 = await Movies.create({
    name: 'Radhe Shyam',
    description: 'Comedy Drama Movie',
    casts: ['Prabhas', 'Pooja Hegde'],
    director: 'Radha Krishna Kumar',
    trailerUrl: 'http://RadhaShyam/trailers/1',
    posterUrl:
      'https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg',
    language: 'Hindi',
    releaseDate: '11-02-2022',
    releaseStatus: 'RELEASED',
  })
  const movie2 = await Movies.create({
    name: 'Radhe Shyam 2',
    description: 'Comedy Drama Movie',
    casts: ['Prabhas', 'Pooja Hegde'],
    director: 'Radha Krishna Kumar',
    trailerUrl: 'http://RadhaShyam/trailers/1',
    posterUrl:
      'https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg',
    language: 'Hindi',
    releaseDate: '11-02-2022',
    releaseStatus: 'RELEASED',
  })
  const movie3 = await Movies.create({
    name: 'Radhe Shyam 3',
    description: 'Comedy Drama Movie',
    casts: ['Prabhas', 'Pooja Hegde'],
    director: 'Radha Krishna Kumar',
    trailerUrl: 'http://RadhaShyam/trailers/1',
    posterUrl:
      'https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg',
    language: 'Hindi',
    releaseDate: '11-02-2022',
    releaseStatus: 'RELEASED',
  })
  console.log('Two users created successfully')

  const client = await Users.create({
    name: 'Client1',
    userId: 'client',
    email: 'soumenghorai2802@gmail.com',
    userType: 'CLIENT',
    password: bcrypt.hashSync('Welcome', 8),
  })
  await Theatre.collection.drop()
  const theatre = await Theatre.create({
    name: 'FunCinema',
    city: 'Bangalore',
    description: 'Top class Theatre',
    pinCode: 560052,
    movies: [movie1._id],
    ownerId: client._id,
  })
  console.log('A movie and a theatre created successfully')
  await Bookings.collection.drop()
  const booking = await Bookings.create({
    theatreId: theatre._id,
    userId: user2._id,
    movieId: movie1._id,
    timing: '9 pm - 12 pm',
    noOfSeats: 5,
  })
  console.log('Booking created')
}

require('./Routers/Movie.route')(expressApp)
require('./Routers/Theatre.route')(expressApp)
require('./Routers/Auth.route')(expressApp)
require('./Routers/User.route')(expressApp)
require('./Routers/Booking.route')(expressApp)
require('./Routers/Payment.route')(expressApp)

expressApp.listen(serverConfig.PORT, () => {
  console.log(`Application started on port ${serverConfig.PORT}`)
})