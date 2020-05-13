const express = require("express")
const userModel = require("..//user/user-model")
const bcrypt = require("bcryptjs")

const { restrict } = require("../middlewear/restrict")


const router = express.Router();

// Register User
router.post("/register", async (req, res, next) => {
    try {
          const {username} = req.body
          const user = await userModel.findBy({username}).first()

          if(user) {
            res.status(409).json({"message": "Username is already taken"})
          } else {
            const payload = {
                                username:req.body.username,
                                password:req.body.password
                            }
            const user = await userModel.addUser(payload)         
            res.status(201).json(user)   
          }           

    } catch(err) {
          next(err)
    }
})


// Login User
router.post("/login", async (req, res, next) => {
    try {
          const {username,password} = req.body
          const user = await userModel.findBy({username}).first()
      
          let validPassword = "";
          if(user) {
             validPassword = await bcrypt.compare(password,user.password)
          }
          if(!user || !validPassword) {
              res.status(401).json({message: "Invalid Credentials"})
          }
       
          req.session.username = user.username
          
          res.json({
			message: `Welcome ${user.username}!`,
		  })
 
    } catch(err) {
          next(err)
    }
})


router.get("/logout", restrict(), (req, res, next) => {
	// this will delete the session in the database and try to expire the cookie,
	// though it's ultimately up to the client if they delete the cookie or not.
	// but it becomes useless to them once the session is deleted server-side.
	req.session.destroy((err) => {
		if (err) {
			next(err)
		} else {
			res.json({
				message: "Successfully logged out",
			})
		}
	})
})


module.exports = router
