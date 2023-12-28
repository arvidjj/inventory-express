
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

// Controller logic for categories
const categoryController = {
  getAllCategories: asyncHandler(async (req, res) => {
      const categories = await Category.find({}, "category_name category_description")
    .sort({ category_name: 1 })
    .exec();
    console.log(categories)
    res.render("categories", { title: "Category List", category_list: categories });
  }),

  getCategoryById: asyncHandler(async (req, res) => {
      const category = await Category.findById(req.params.id);
      res.render("category-detail", { title: "Category List", category: category });
  }),

  createCategory: asyncHandler(async (req, res) => {
    const { category_name, category_description } = req.body;

    // Validate or sanitize input as needed

    const newCategory = new Category({
      category_name,
      category_description,
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    }),

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryController;
