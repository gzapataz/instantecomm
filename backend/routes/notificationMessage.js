var express = require('express');
var NotificationMessageController = require('../controllers/notificationMessage');
var router = express.Router();

router.get('/', NotificationMessageController.getNotificationMessages);
router.post('/', NotificationMessageController.setNotificationMessage);
router.get('/:_id', NotificationMessageController.getNotificationMessageBy_id);

module.exports = router;