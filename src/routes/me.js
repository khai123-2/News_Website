const meController = require('../app/controllers/me.controller')
var express = require('express')
const router = express.Router();


router.get('/stored/posts',meController.show)
router.get('/stored/category',meController.display)
module.exports = router;