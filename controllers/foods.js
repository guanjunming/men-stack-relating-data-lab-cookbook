const User = require("../models/Users.js");

const createItem = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.pantry.push(req.body);
    await user.save();

    res.json({ message: "Item added to pantry" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error adding pantry item" });
  }
};

const getItems = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ pantry: user.pantry });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error getting pantry items" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in pantry" });
    }

    user.pantry.pull({ _id: req.params.itemId });
    await user.save();

    res.json({ message: "Item deleted from pantry" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting pantry item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in pantry" });
    }

    item.set(req.body);
    await user.save();

    res.json({ message: "Food item updated", food: item });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error updating pantry item" });
  }
};

module.exports = { createItem, getItems, deleteItem, updateItem };
