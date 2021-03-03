let userService = require("../service/userService")
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
}
module.exports = new userController();