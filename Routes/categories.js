const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = router;
