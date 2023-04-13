const User = require('../models/User')
const Keep = require('../models/Keep')

module.exports = {
    getDash: async (req, res)=> {
        try {
            const userData = await User.findOne({userId: req.user._id})
            if (userData.numberOfKeeps === 0) {
                const keepData = 0;
                res.render('dash.ejs', {userDataArray: userData, keepDataArray: keepData})
            } else {
                const keepData = await Keep.findOne({userID: req.user._id})
                res.render('dash.ejs', {userDataArray: userData, keepDataArray: keepData})
            }
        } catch (err) {
            console.log(err)
        }
    }
}