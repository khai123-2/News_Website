const newsController = require('../app/controllers/news.controller')
const siteController = require('../app/controllers/site.controller')
var express = require('express')
const router = express.Router();



router.get('/', siteController.index);
router.get('/search',siteController.search)
router.get('/cate/:id',siteController.display)
router.get('/:slug',siteController.show)





module.exports = router;