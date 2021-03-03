const { validationResult } = require('express-validator')
let { InterServerError, UnprocessableEntity } = require('./httpStatusCode.json')
const { errorLogger } = require("../middleware/logger")


let response = {}

exports.validation =(req, res, next) => {
    try{
     
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            response.success=false,
            response.message = "you have filled invalid data"
            response.error = errors.array();
            errorLogger.error(JSON.stringify(response));
            return res.status(UnprocessableEntity).send(response)
        }else{
           
            next();
        }
    }
    catch(error){
     
        response.success=false,
        response.message = "something went Wrong"
        errorLogger.error(JSON.stringify(response));
        return res.status(InterServerError).send(response)
    }

}