const User = require('../models/User')
const Keep = require('../models/Keep')
const Station = require('../models/Station')

module.exports = {
    getDash: async (req, res)=> {
        try {
            const userData = await User.findOne({_id: req.user})
            var keepData = await Keep.findOne({userID: req.user, active: true})
            if (!keepData) {
                keepData = 0;
                res.render('dash.ejs', {userDataArray: userData, keepDataArray: keepData})
            } else {
                const stationData = await Station.find()
                // console.log(keepData)
                res.render('dash.ejs', {userDataArray: userData, keepDataArray: keepData, stationDataArray: stationData})
            }
        } catch (err) {
            console.log(err)
            res.redirect('/login')
        }
    },
    getNewKeep: async (req, res) => {
        try {
            const userData = await User.findOne({userId: req.user._id})
            var keepData = await Keep.findOne({userID: req.user._id})
            const stationData = await Station.find()
            if (!keepData) {
                keepData = 0;
                res.render('newKeep.ejs', {userDataArray: userData, keepDataArray: keepData, stationArray: stationData})
            } else {
                res.render('newKeep.ejs', {userDataArray: userData, keepDataArray: keepData})
            }
        } catch (err) {
            console.log(err)
            res.redirect('/dashboard')
        }
    },
    postKeep: async (req, res) => {
        try {
            await Keep.create({
                userID: req.user,
                keepStation: req.body.new_keep_station,
                stationName: req.body.station_name,
                rideType: req.body.ride_type
            })
            await User.findOneAndUpdate({ _id: req.user }, { $set: { numberOfKeeps: 1 }})
            await Station.findOneAndUpdate( {_id: req.body.new_keep_station }, { $inc: { keepCount: 1 }})
            res.redirect(`/dashboard/qr-entry`)
        } catch (err) {
            console.log(err)
            res.redirect('/dashboard/new-keep')
        }
    },
    getQR: async (req, res) => {
        try{
            const userData = await User.findOne({_id: req.user})
            const keepData = await Keep.findOne({userID: req.user, active: true})
            res.render('qrCode.ejs', {userDataArray: userData, keepDataArray: keepData})
        } catch (err) {
            console.log(err)
        }
    },
    endKeep: async (req, res) => {
        try{
            await Keep.findOneAndUpdate({_id: req.body.ObjectId}, { $set: { active: false, duration: req.body.DurationTime, keepPrice: req.body.Price }})
            await User.findOneAndUpdate({_id: req.user}, { $set: {numberOfKeeps: 0 }})
            await Station.findOneAndUpdate({_id: req.body.StationID}, { $inc: { keepCount: -1 }})
            console.log(`Keep ${req.body.ObjectId} Ended.`)
            res.json('Keep Ended')
        } catch (err) {
            console.log(err)
        }
    },
    getSummary: async (req, res) => {
        try {
            const userData = await User.findOne({userId: req.user._id})
            var keepData = await Keep.findOne({_id: req._parsedUrl.query})
            res.render('keepSummary.ejs', { keepDataArray: keepData, userDataArray: userData })
        } catch (err) {
            console.log(err)
            res.redirect('/dashboard')
        }
    },
    getHistory: async (req, res) => {
        try{
            const keepData = await Keep.find({userID: req.user})
            const userData = await User.findOne({_id: req.user})
            res.render('history.ejs', {userDataArray: userData, keepDataArray: keepData})
        } catch (err) {
            console.log(err)
            res.redirect('/dashboard')
        }
    }
}