const express = require("express")
const userModel = require("./user-model")

const { restrict } = require("../middlewear/restrict")

const router = express.Router();

// Get All Users
router.get("/users", restrict(), async (req, res, next) => {
   try {  
         const users = await userModel.getUsers()
         res.json({users})
   } catch(err) {
         next(err)
   }
   
})

module.exports = router
