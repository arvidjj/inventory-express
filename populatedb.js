#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({category_name: name, category_description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, quantity, price, categoryId) {
  const item = new Item({item_name: name, quantity, price, category: categoryId });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Groceries", "Misc groceries"),
    categoryCreate(1, "Car Parts", "Mechanical stuff"),
    categoryCreate(2, "Toys", "Fun stuff"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, "Bread", 100, 2.5, categories[0]),
    itemCreate(1, "Engine Oil", 50, 10.0, categories[1]),
    itemCreate(2, "Action Figure", 200, 5.0, categories[2]),
  ]);
}
