var express = require('express');
var NotificationController = require('../controllers/notification');
var router = express.Router();

router.get('/', NotificationController.getNotifications);
router.post('/', NotificationController.setNotification);
router.get('/:_id', NotificationController.getNotificationBy_id);

module.exports = router;