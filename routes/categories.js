const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes for categories
router.get('/', categoryController.getAllCategories);
router.get('/new', function(req, res, next) {
    res.render('create-category', { title: 'New Category'});
  });
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);



router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
