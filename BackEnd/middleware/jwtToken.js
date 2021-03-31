const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
let { Forbidden, unauthorized } = require("../middleware/httpStatusCode.json");
const { infoLogger } = require("./logger");
let response = {}


const tokenGeneration = (payload, next) => {
    // const tokenGeneration = (payload) => {
    let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1hr' })
        // response.success = true
        // response.message = "Token Generated Sucessfully"
    response.token = token
    infoLogger.info(JSON.stringify(response));
    // return response
    return token;
}


const tokenVerify = (req, res, next) => {
    try {
        let token = req.header('token') || req.params.token;
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (error, data) => {
                if (error) {
                    return res.send({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = data;
                    next();
                }
            });
        } else {
            logger.error('No token provided...')
            return res.send({

                success: false,
                message: 'No token provided.'
            });
        }
    } catch (error) {
        next(error);
    }
}


module.exports = { tokenGeneration, tokenVerify }