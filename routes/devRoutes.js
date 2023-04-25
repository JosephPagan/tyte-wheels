const express = require('express')
const router = express.Router()
const devController = require('../controllers/dev')
// const authController = require('../controllers/auth')
// const authMiddleware = require('../middleware/auth')

router.get('/stations', devController.getStationList)
router.get('/add-station', devController.getNewStation)
router.post('/post-station', devController.postNewStation)

module.exports = router