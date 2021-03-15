const route = require("express").Router();
const jwtToken = require('../middleware/jwtToken')
const LabelController = require('../Controller/LabelController')
expressValidator = require('express-validator');


//creating Label
route.post('/addlabel',jwtToken.tokenVerify, LabelController.createLabel)
route.delete('/deletelabel/:id',jwtToken.tokenVerify, LabelController.deleteLabel)
route.post('/updateLabel/:id',jwtToken.tokenVerify,LabelController.updateLabel)
route.get('/getuserLabel',LabelController.getUserLabels)


module.exports = route