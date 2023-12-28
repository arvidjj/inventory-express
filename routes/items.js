const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define routes for items
router.get('/', itemController.getAllItems);
router.get('/new', itemController.newItemForm);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
