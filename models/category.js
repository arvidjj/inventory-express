// models/category.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  category_description: { type: String}
});

// Virtual for book's URL
categorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/categories/${this.category_id}`;
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
