const express = require('express')
const router = express.Router()

const Countries = require('../models/countries')

router.get('/countries', function (req, res, next) {
    const query = req.query.region ? {
        region: req.query.region
    } : {}
    return Countries.find(query, '-_id').then(
        (countries) => res.send(countries)).catch(
        (err) => next(err))
})

module.exports = router
