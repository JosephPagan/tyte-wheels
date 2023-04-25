const User = require('../models/User')
const Keep = require('../models/Keep')
const Station = require('../models/Station')

module.exports = {
    getStationList: async (req, res) => {
        try {
            const stationData = await Station.find()
            res.render('stations.ejs', {stationArray: stationData})
        } catch (err) {
            console.log(err)
        }
    },
    getNewStation: (req, res) => {
        res.render('addStation.ejs')
    },
    postNewStation: async (req, res) => {
        try {
            await Station.create({ 
                stationName: req.body.new_name,
                zipCode: req.body.new_zip_code,
                capacity: req.body.new_capacity
            })
            res.redirect('/dev/stations')
        } catch (err) {
            console.log(err)
        }
    }
}