const bcrypt = require("bcryptjs")
const userModel = require("../user/user-model")


function restrict() {
    const authError = {
        message: "Invalid credential"
    }

    return (req, res, next) => {
        //console.log(req.session)
        try {
             
                if(!req.session || !req.session.username) {                  
                   return res.status(401).json(authError)
                }

                next()


        } catch(err) {
            next(err)
        }
    }
}


module.exports = {
    restrict
}