const mongoose = require('mongoose')

const CountriesSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    region: {
        type: String
    }
})

const Countries = mongoose.model('countries', CountriesSchema)

module.exports = Countries
