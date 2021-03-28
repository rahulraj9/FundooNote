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
            } else {
                if (data) {
                    return callback(null, { flag: true, message: "Login sucessfull !", data: data, code: OK });
                } else {
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
                    return ({ flag: true, message: "Please Check Your Mail For forget Password Link!!", status: statusCode.OK });
                } else {
                    return ({ flag: false, message: "Email Not Exist Please Enter Valid Mail", status: statusCode.NotFound });
                }
            }).catch((error) => {
                return ({ flag: false, message: "Something Went Wrong Please Check", error: error });
            })

    }
    resetPassword(email, password) {
        let hashPass = bcryptpassword.encrypt(password);
        return userModel.resetPassword(email, hashPass)
            .then((result) => {
                if (result) {
                    return ({ flag: true, message: "Password has been successfully Changed!!", status: statusCode.OK });
                } else {
                    return ({ flag: false, message: "Something Went Wrong Please Do Forget Password Again!!", status: statusCode.BadRequest });
                }
            }).catch((err) => {
                return ({ flag: false, message: "Please Enter Valid Input!!", status: statusCode.NotFound });
            });

    }
}
module.exports = new UserService();