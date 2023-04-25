const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash')
// const authController = require('../controllers/auth')
// const authMiddleware = require('../middleware/auth')

router.get('/', dashController.getDash)
router.get('/new-keep', dashController.getNewKeep)
router.post('/post-keep', dashController.postKeep)
router.put('/end-keep', dashController.endKeep)
router.get('/history', dashController.getHistory)

module.exports = router