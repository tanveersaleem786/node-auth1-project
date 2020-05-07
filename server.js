const express = require("express")
const session = require("express-session")
// this is just immediately calling the imported function with `session` as a parameter
const KnexSessionStore = require("connect-session-knex")(session)
const userRouter = require("./user/user-router")
const dbConfig = require("./data/config")

const server = express()

server.use(express.json())

server.use(session({
	name: "token", // overwrites the default cookie name, hides our stack better
	resave: false, // avoid recreating sessions that have not changes
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
	cookie: {
		httpOnly: true, // disallow javascript from reading our cookie contents
	// 	maxAge: 15 * 1000, // expire the cookie after 15 seconds
	},
	store: new KnexSessionStore({
		knex: dbConfig, // configured instance of knex
		createtable: true, // if the session table doesn't exist, create it automatically
	}),
}))

server.use("/api", userRouter)

server.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

server.use((err, req, res) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

module.exports = server