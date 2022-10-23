const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/notifications', userController.getAllNotifications)
router.post('/deleteNoti/:id', userController.deleteNotification)
router.post('/deleteAllNotis', userController.deleteAllNotifications)
router.post('/readNoti', userController.readNotification)
module.exports = router