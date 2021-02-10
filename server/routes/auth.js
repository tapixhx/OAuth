const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/googleLogin', authController.gLogin);
router.post('/facebookLogin', authController.fLogin);

module.exports = router;