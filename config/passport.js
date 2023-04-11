const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email.toLowerCase()})
    .then( (user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {return done(err)}
        if (isMatch) {
          return done(null, user)
        }
      })
    })
      // console.log(`Passport User: ${user}`)
    .catch((err) => {
      console.log(err)
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((user, done) => {
    // console.log(`Deserialize: ${user}`)
    done(null, user)
  })
}
