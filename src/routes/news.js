const newsController = require('../app/controllers/news.controller')
const multer  = require('multer')
const path = require('path')
var express = require('express')
const router = express.Router();

const upload = multer({ dest: path.resolve(__dirname, '../public/uploads')})

router.get('/create',newsController.create)
router.post('/create', upload.single('thumnail'),newsController.store)
router.get('/:id/edit',newsController.edit)
router.put('/:id',upload.single('thumnail'),newsController.update)
router.delete('/:id',newsController.destroy)


module.exports = router;