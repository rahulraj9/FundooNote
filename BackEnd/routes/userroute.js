
const route = require("express").Router();
const{registration,login,forget,resetPassword}= require("../middleware/validator")
const {validation} = require("../middleware/validate")
let userController = require("../Controller/usercontroller")
const jwtToken = require("../middleware/jwtToken")


//routes for user functionality
route.post('/registration',registration,validation, userController.userResgistartionController)
route.post('/login',login,validation, userController.userLoginController)
route.post('/forgetpassword',forget,validation,userController.forgetPassword)
route.post("/resetPassword/:token",resetPassword,validation,jwtToken.tokenVerify,userController.resetPassword)
module.exports = route