const User = require('../models/User')

module.exports = {
    getDash: async (req, res)=> {
        try {
            const userData = await User.findOne({userId: req.user._id})
            res.render('dash.ejs', {userDataArray: userData})
        } catch (err) {
            console.log(err)
        }
    }
}