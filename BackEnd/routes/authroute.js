
const route = require("express").Router();
const{registration,login,forget}= require("../middleware/validator")
const {validation} = require("../middleware/validate")
let userController = require("../Controller/auth_controller")


//routes for user functionality
route.post('/user/registration',registration,validation, userController.userResgistartionController)
route.post('/user/login',login,validation, userController.userLoginController)
route.post('/user/forgetpassword',forget,validation,userController.forgetPassword)
module.exports = route