const User = require('../models/User')

module.exports = {
    getHome: (req,res)=> {
        res.render('home.ejs')
    },
    getCreateAccount: (req, res) => {
        res.render('signUp.ejs')
    },
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getRideSelect: (req, res) => {
        res.render('rideSelect.ejs')
    },
    getRideImage: (req, res) => {
        res.render('rideImage.ejs')
    },
    getWaiver: (req, res) => {
        res.render('waiver.ejs')
    },
    updateWheels: async (req, res) => {
        try {
            await User.findOneAndUpdate({_id: req.user}, {$set: {wheelType: req.body.wheels}})
            res.redirect('/ride-image')
        } catch (err) {
            console.log(err)
        }
    },
    updateWaiver: async (req, res) => {
        try {
            if (req.body.waiverAnswer === 'true') {
                await User.findOneAndUpdate({_id: req.user}, {$set: {waiverSign: true}})
                res.redirect('/dashboard')
                
            } else {
                res.redirect('/logout')
            }
        } catch (err) {
            console.log(err)
        }
    }
}