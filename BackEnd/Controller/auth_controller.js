let userService = require("../service/userService")
let statusCode = require("../middleware/httpStatusCode.json")
const { infoLogger, errorLogger } = require('../middleware/logger')
let response = {}



class userController {


    userControllerResponse = (res, value) => {
        response.response = value.flag;
        response.message = value.message;
        response.error = value.error;
        response.data = value.data

        return res.status(value.code).send(response);
    }

    userResgistartionController = (req, res, next) => {
        try {
            userService.userRegistrationService(req.body, (error, data) => {
                if (error) {

                    errorLogger.error(JSON.stringify(error))
                    this.userControllerResponse(res, error)
                } else {
                    infoLogger.info(JSON.stringify(data))
                    this.userControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error);
        }
    }
    userLoginController = (req, res, next) => {
        try {
            userService.userLoginService(req.body, (error, data) => {
                if (error) {
                    errorLogger.error(JSON.stringify(error))
                    this.userControllerResponse(res, error)
                } else {
                    infoLogger.info(JSON.stringify(data))
                    this.userControllerResponse(res, data);
                }
            })
        }
        catch (error) {
            next(error)

        }
    }

    forgetPassword(req, res, next) {
        try {
            userService.forgetPassword(req.body)
                .then((result) => {

                    response.flag = true;
                    response.message = result.message;
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {

                    response.flag = false;
                    response.data = err.message;
                    res.status(statusCode.BadRequest).send(response);
                });
        } catch (error) {
            next(error)
        }
    }

    resetpassword = (req, res, next) => {
        try {
            userService.resetpassword(req.body, (error, data) => {
                if (error) {
                    errorLogger.error(JSON.stringify(error))
                    this.userControllerResponse(res, error)
                } else {
                    infoLogger.info(JSON.stringify(data))
                    this.userControllerResponse(res, data);
                }
            })
        }
        catch (error) {
            next(error)

        }
    }
}
module.exports = new userController();