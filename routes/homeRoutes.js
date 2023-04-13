const express = require('express')
const home = require('../controllers/home')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
// const authMiddleware = require('../middleware/auth')

router.get('/', homeController.getHome)
// router.get('/create-account', homeController.getCreateAccount)
// router.get('/login', homeController.getLogin)
router.get('/select-ride', homeController.getRideSelect)
router.post('/update-ride', homeController.updateWheels)
router.get('/ride-image', homeController.getRideImage)
router.get('/waiver-sign', homeController.getWaiver)
router.post('/update-waiver', homeController.updateWaiver)

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/create-account', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/logout', authController.logout)

module.exports = router