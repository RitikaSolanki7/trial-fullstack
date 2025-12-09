
const express = require('express');
const SubscribeController = require('../controllers/subscribeController');
const router = express.Router();

router.post('/', SubscribeController.create);
router.get('/', SubscribeController.getAll);

module.exports = router;
