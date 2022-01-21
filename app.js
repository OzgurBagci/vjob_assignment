// use .env file
const dotenv = require('dotenv')
dotenv.config()

// require base
const express = require('express')

// require db related
const mongoose = require('mongoose')

// require routes
const countriesRouter = require('./routes/countries')
const salesrepRouter = require('./routes/salesrep')

// setup base
const app = express()
const port = 3000

// configure db related
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.log.bind(console, 'Mongo Error: '))


// configure middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// configure paths
app.use('/', countriesRouter)
app.use('/', salesrepRouter)

// Error handler 
app.use((err, req, res, next) => {
    console.log('Error handler caught: ', err, 'for request: \n', req)
    res.sendStatus(500)
})

// start listener
app.listen(port, () => console.log("API started on Port: ", port))

module.exports = app
