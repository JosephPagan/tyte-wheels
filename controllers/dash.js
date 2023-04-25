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
                console.log(keepData)
                res.render('dash.ejs', {userDataArray: userData, keepDataArray: keepData, stationDataArray: stationData})
            }
        } catch (err) {
            console.log(err)
            res.redirect('/login')
        }
    },
    getNewKeep: async (req, res) => {
        console.log(req.user)
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
        console.log(req.body)
        try {
            await Keep.create({
                userID: req.user,
                keepStation: req.body.new_keep_station,
                stationName: req.body.station_name,
                rideType: req.body.ride_type
            })
            await User.findOneAndUpdate({ _id: req.user }, { $set: { numberOfKeeps: 1 }})
            await Station.findOneAndUpdate( {_id: req.body.new_keep_station }, { $inc: { keepCount: 1 }})
            res.redirect('/dashboard')
        } catch (err) {
            console.log(err)
            res.redirect('/dashboard/new-keep')
        }
    },
    endKeep: async (req, res) => {
        console.log(req.body)
        try{
            await Keep.findOneAndUpdate({_id: req.body.ObjectId}, { $set: { active: false, duration: req.body.DurationTime }})
            await User.findOneAndUpdate({_id: req.user}, { $set: {numberOfKeeps: 0 }})
            await Station.findOneAndUpdate({_id: req.body.StationID}, { $inc: { keepCount: -1 }})
            console.log(`Keep ${req.body.ObjectId} Ended.`)
            res.json('Keep Ended')
        } catch (err) {
            console.log(err)
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