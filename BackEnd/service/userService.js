let userModel = require("../model/usermodel")
let BcryptPassword = require("../middleware/bcryptpassword")

let { OK, Conflict, NotFound, BadRequest,unauthorized } = require("../middleware/httpStatusCode.json")
const bcryptpassword = require("../middleware/bcryptpassword")


class UserService {
    userRegistrationService = (req, callback) => {
        req.password = bcryptpassword.encrypt(req.password);
        return userModel.userRegistartion(req, (error, data = null) => {
            if (error) {
                if (error.length > 0) {
                    return callback({ flag: false, message: "Email Already Registerd !", code: Conflict});
                }
                return callback({ flag: false, message: "Registraton Failed !", error:error,code: BadRequest });
            } else {
                return callback(null, { flag: true, message: "Registraton sucessfull !", data: data, code: OK });
            }
        })
    }

    userLoginService =(req,callback)=>{
        return userModel.userLogin(req,(error,data = null)=>{
            if(error){
                if(error.length === 0){
                    return callback({ flag: false, message: "Email doesnot exits !", code: NotFound});
                }
                return callback({ flag: false, message: "Login Failed !",error:error, code: BadRequest});
            }
            else{
                if(data){
                    return callback(null, { flag: true, message: "Login sucessfull !", data: data, code: OK });
                }
                else{
                    return callback({ flag: false, message: "password not matched !",code:unauthorized });
                }
            }
        })
    }
}

module.exports = new UserService();