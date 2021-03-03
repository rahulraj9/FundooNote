const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
let{Forbidden,unauthorized} =require("../middleware/httpStatusCode.json");
const { infoLogger } = require("./logger");
let response={}


const tokenGeneration =(payload,next)=>{
    // try{
        let token=jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:'1hr'})
        response.success = true
        response.message ="Token Generated Sucessfully"
        response.token =token
        infoLogger.info(JSON.stringify(response));
        return response

    }
    // catch(error){
    //     next(error)
    // }
// }
module.exports ={tokenGeneration}