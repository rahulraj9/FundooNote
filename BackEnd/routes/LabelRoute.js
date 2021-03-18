const route = require("express").Router();
const jwtToken = require('../middleware/jwtToken')
const LabelController = require('../Controller/LabelController')
expressValidator = require('express-validator');


//creating Label
route.post('/label',jwtToken.tokenVerify, LabelController.createLabel)
route.delete('/label/:id',jwtToken.tokenVerify, LabelController.deleteLabel)
route.put('/label/:id',jwtToken.tokenVerify,LabelController.updateLabel)
route.get('/label',LabelController.getUserLabels)


module.exports = route