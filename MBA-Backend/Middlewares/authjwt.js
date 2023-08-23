const jwt = require('jsonwebtoken')
const config = require('../Configs/auth.config')
const User = require('../Models/Users')
const constants = require('../Utills/Constants/userType')

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized in Token Section...',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = async (req, res, next) => {
  const user = await User.findOne({
    userId: req.userId,
  })
  if (user && user.userType == constants.userTypesObject.userTypes.admin) {
    next()
  } else {
    res.status(403).send({
      message: 'Require Admin Role!',
    })
    return
  }
}

const isAdminOrClient = async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId })

  if (
    user &&
    (user.userType == constants.userTypesObject.userTypes.admin ||
      user.userType == constants.userTypesObject.userTypes.client)
  ) {
    next()
  } else {
    res.status(403).send({
      message: 'Require Admin or Client Role!',
    })
  }
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminOrClient: isAdminOrClient,
}
module.exports = authJwt