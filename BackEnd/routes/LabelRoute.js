const route = require("express").Router();
const jwtToken = require('../middleware/jwtToken')
const LabelController = require('../Controller/LabelController')
expressValidator = require('express-validator');

route.post('/addlabel',jwtToken.tokenVerify, LabelController.createLable)
module.exports = route