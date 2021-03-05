let userModel = require("../model/usermodel")
let jwtToken = require("../middleware/jwtToken")
const mailler = require('../middleware/nodemailer')
let statusCode = require("../middleware/httpStatusCode.json")
let { OK, Conflict, NotFound, BadRequest, unauthorized } = require("../middleware/httpStatusCode.json")
const bcryptpassword = require("../middleware/bcryptpassword")


class UserService {
    userRegistrationService = (req, callback) => {
        req.password = bcryptpassword.encrypt(req.password);
        return userModel.userRegistartion(req, (error, data = null) => {
            if (error) {
                if (error.length > 0) {
                    return callback({ flag: false, message: "Email Already Registerd !", code: Conflict });
                }
                return callback({ flag: false, message: "Registraton Failed !", error: error, code: BadRequest });
            } else {
                return callback(null, { flag: true, message: "Registraton sucessfull !", data: data, code: OK });
            }
        })
    }

    userLoginService = (req, callback) => {
        return userModel.userLogin(req, (error, data = null) => {
            if (error) {
                if (error.length === 0) {
                    return callback({ flag: false, message: "Email doesnot exits !", code: NotFound });
                }
                return callback({ flag: false, message: "Login Failed !", error: error, code: BadRequest });
            }
            else {
                if (data) {
                    return callback(null, { flag: true, message: "Login sucessfull !", data: data, code: OK });
                }
                else {
                    return callback({ flag: false, message: "password not matched !", code: unauthorized });
                }
            }
        })
    }

    forgetPassword(data) {
        let email = data.email
        let tokenData = {
            mail: email
        }
        return userModel.findOne(email)
            .then((result) => {
                if (result) {
                    let token = jwtToken.tokenGeneration(tokenData);
                    mailler.mailer(email, token)
                    return ({ flag: true, message: "Please Check Your Mail For Reset Password!!", status: statusCode.OK });
                } else {
                    return ({ flag: false, message: "Email Not Exist Please Enter Valid Mail", status: statusCode.NotFound });
                }
            }).catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })

    }
    resetPassword = function (userDetails, token, callback) {
        userModel.resetPassword(userDetails, token, function (err, result) {
            if (err) {
                callback(err, null);
            }
            else if (!result) {
                callback(null, 'Password reset token is invalid or has expired.');
            }
            else if (result) {
                mailler.mailer(email,token)
            }
            else {
                return ({ message: "Something Went Wrong Please Check", error: error });
            }
        })
    }


}
module.exports = new UserService();








