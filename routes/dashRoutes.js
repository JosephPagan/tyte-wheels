const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash')
// const authController = require('../controllers/auth')
// const authMiddleware = require('../middleware/auth')

router.get('/', dashController.getDash)

module.exports = router