const mongoose = require("mongoose");
const mailler = require('../middleware/nodemailer')
// var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
let bcryptpassword = require("../middleware/bcryptpassword")
let jwtToken = require("../middleware/jwtToken")
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true,
        unique: [true, "Email is not valid"]

    },

    password: {
        type: String,
        required: true

    },
    isActivated: {
        type: Boolean,
        default: false
    }


})

const users = mongoose.model('User', userSchema)

class userModel {

    userDataObject = (result) => {
        return {
            "_id": result._id,
            "firstName": result.firstName,
            "lastName": result.lastName,
            "email": result.email
        }

    }
    userRegistartion = (req, callback) => {
        users.find({ "email": req.email }, (err, data) => {
            if (err) {
                callback(err)
            } else if (data.length > 0) {
                callback(data)
            } else {
                users.create(req, (err, data) => {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(null, data);
                    }
                })
            }

        })
    }
    userLogin = (req, callback) => {
        users.find({ "email": req.email }, (err, data) => {
            if (err) {

                callback(err)
            } else if (data.length === 0) {
                callback(data)
            } else {
                bcryptpassword.comparePassword(req.password, data[0].password).then(async result => {
                    if (result) {
                        let token = jwtToken.tokenGeneration(this.userDataObject(data[0]));
                        let userData = {
                            "_id": data[0]._id,
                            "firstName": data[0].firstName,
                            "lastName": data[0].lastName,
                            "email": data[0].email,
                            "token": token
                        }
                        callback(null, userData)
                    }
                    else {
                        callback(null, result)
                    }
                })
            }

        })
    }

    findOne(mail) {
        return users.findOne({ email: mail })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })

    }


    resetPassword(email, password) {
        return users.updateOne({ email: email }, { $set: { password: password } })
            .then((result) => {
                return result;
            }).catch((err) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            });

    }

    search(searchKey) {
        return users.find({
            $or: [
                { "email": { $regex: searchKey } },
                { "firstName": { $regex: searchKey } },
                { "lastName": { $regex: searchKey } }
            ]
        })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            })
    }
}

module.exports = new userModel()