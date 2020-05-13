const db = require("../data/config")
const bcrypt = require("bcryptjs")

function getUsers() {
    return db("users").select("id","username")
}

function findBy(filter) {
    return db("users").where(filter)
}


async function addUser(user) {   
    // hash the password with a time complexity of 12
    user.password = await bcrypt.hash(user.password,12) 
    //console.log(user)
    return db("users")
    .insert(user)
    .then(([id]) => findBy({id}))
}


module.exports = {
    getUsers,
    findBy,
    addUser

}