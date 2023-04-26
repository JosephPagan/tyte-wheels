const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('login.ejs', {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/dashboard')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    console.log(req.user)
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        console.log(`${req.user} has been logged out.`)
        req.session.destroy()
        res.redirect('/login')
      })
    }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('signUp.ejs', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    // console.log(req.body)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../create-account')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.first_name,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      phone: req.body.phone_number,
      email: req.body.email,
      zipCode: req.body.zipCode,
      password: req.body.password
    })

    User.findOne({email: req.body.email})
        .then((err, existingUser) => {
            if (err) { return next(err) }
            if (existingUser) {
                req.flash('errors', { msg: 'Account with that email address already exists.'})
                return res.redirect('../create-account')
            }
            user.save().then(() => {
                req.logIn(user, (err) => {
                    if (err) { return next(err) }
                    console.log(user)
                    res.redirect('/select-ride')
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })

  }