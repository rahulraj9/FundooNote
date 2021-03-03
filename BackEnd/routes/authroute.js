// const express = require('express')
// const router = express.Router()
const route = require("express").Router();
const{registration}= require("../middleware/validator")
const {validation} = require("../middleware/validate")
let userController = require("../Controller/auth_controller")


route.post('/user/registration',registration,validation, userController.userResgistartionController)
route.post('/user/login', userController.userLoginController)

module.exports = route