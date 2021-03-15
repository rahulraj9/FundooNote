const route = require("express").Router();
const jwtToken = require('../middleware/jwtToken')
const LabelController = require('../Controller/LabelController')
expressValidator = require('express-validator');

route.post('/addlabel',jwtToken.tokenVerify, LabelController.createLabel)

route.post('/addlabelonnote',jwtToken.tokenVerify, LabelController.createLabelOnNote)

route.post('/updatelabelonnote',jwtToken.tokenVerify, LabelController.updateLabelOnNote)

route.delete('/deletelabel',jwtToken.tokenVerify, LabelController.deleteLabel)

route.delete('/deletelabelonNote',jwtToken.tokenVerify, LabelController.deleteLabelOnNote)

module.exports = route