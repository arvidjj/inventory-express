const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

// Controller logic for items
const itemController = {
  getAllItems: asyncHandler(async (req, res) => {
    const items = await Item.find({}, "item_name quantity price category")
  .sort({ item_name: 1 })
  .exec();
  
  res.render("items", { title: "Item List", items: items });
}),

getItemById: asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const category = await Category.findById(item.category);
    console.log(category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found for the item' });
    }
    console.log(category);
    res.render("item-detail", { title: "Item ", item: item, category: category });
}),

newItemForm: asyncHandler(async (req, res) => {
  const categories = await Category.find({}, "category_id category_name").sort({ category_name: 1 }).exec();
    res.render("create-item", { title: "Create Item", categories });
}),

  createItem: asyncHandler(async (req, res) => {
    const { item_name, quantity, price, category } = req.body;

    const newItem = new Item({
      item_name,
      quantity,
      price,
      category,
    });
    console.log(newItem)
    await newItem.save();

    res.status(201).json({ message: 'Item created successfully', item: newItem });
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }),

  updateItem: async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = itemController;
