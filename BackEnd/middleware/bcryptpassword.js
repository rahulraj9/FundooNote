const bcrypt = require('bcryptjs');
const { Promise } = require('mongoose');

class BcryptPassword {

    encrypt = (password, next) => {
        try {
            let saltSecret = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, saltSecret);
        } catch (error) {
            next(error)
        }

    }

    comparePassword =(password,comparePassword,next)=>{
        try{
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password,comparePassword).then(data=>{
                    resolve(data ?true:false);
                }).catch(err=>{
                    reject(err)
                })
            })

        }catch(error){
            next(error)
        }
    }
}


module.exports = new BcryptPassword();