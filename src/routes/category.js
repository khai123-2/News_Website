var express = require('express')
const router = express.Router();

const CategoryController = require('../app/controllers/category.controller') 


router.get('/create',CategoryController.create)
router.post('/create',CategoryController.store)
router.get('/:id/edit',CategoryController.edit)
router.put('/:id',CategoryController.update)
router.delete('/:id',CategoryController.destroy)

module.exports = router;