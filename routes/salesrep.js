const express = require('express')
const router = express.Router()

const axios = require('axios')

router.get('/salesrep', function (req, res, next) {
    return axios.get('http://localhost:3000/countries').then(countries => {
        const regionCount = countries.data.reduce((acc, ele) => {
            acc[ele.region] = acc[ele.region] || 0
            acc[ele.region]++
            return acc
        }, {})

        const repRes = {}

        for (const key of Object.keys(regionCount)) {
            countryCount = regionCount[key]
            if (countryCount < 3)
                return res.status(500).send({
                    'Error': 'Cannot conform the specs.'
                })
            repRes[key] = {
                region: key,
                minSalesReq: (countryCount / 7 >> 0) + 1,
                maxSalesReq: countryCount / 3 >> 0
            }
        }

        return res.send(repRes)
    }).catch(err => next(err))
})

module.exports = router
