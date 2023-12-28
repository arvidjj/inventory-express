// models/item.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
});

itemSchema.index({ item_name: 1, category_id: 1 }, { unique: true }); // Ensure unique_item constraint

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
