const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    console.log(email, password)
    try {
      const user = await User.findOne({email: email.toLowerCase()})
      console.log(user)
      if (!user) {
        return done(null, false, {msg: `Email ${email} not found.`})
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {return done(err)}
        if (isMatch) {
          return done(null, user)
        }
      return done(null, false, {msg: 'Invalid email or password.'})
      })

      passport.serializeUser((user, done) => {
        console.log("Serialize: " + user)
        done(null, user._id)
      })
    
      passport.deserializeUser((user, done) => {
        // console.log("Deserialize: " + user)
        done(null, user)
      })

    } catch(err) {
      console.log(err)
    }
})
)}
