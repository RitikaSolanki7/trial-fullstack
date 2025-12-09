
const express = require('express');
const ContactController = require('../controllers/contactController');
const router = express.Router();

router.post('/', ContactController.create);
router.get('/', ContactController.getAll);

module.exports = router;
