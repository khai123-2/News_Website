const authController = require('../app/controllers/auth.controller')
var express = require('express')
const router = express.Router();


router.get('/login',authController.show)
router.post('/login',authController.check)
router.get('/logout',authController.logout)

module.exports = router;
