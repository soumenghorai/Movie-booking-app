const authController = require ("../Controllers/Auth.controller")


module.exports = function (app) {
     app.post("/MovieBooking/api/v1/signUp" , authController.SignUp);
     app.post("/MovieBooking/api/v1/signIn" , authController.SignIn);
}