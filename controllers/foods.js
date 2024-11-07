const User = require("../models/user.js");

const createItem = async (req, res) => {
  try {
    const user = await User.findById(req.decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = { name: req.body.name };
    user.pantry.push(item);

    await user.save();
    res.json({ message: "Item added to user's pantry" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error adding pantry item" });
  }
};

const getItems = async (req, res) => {
  try {
    const user = await User.findById(req.decoded._id);
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
    const user = await User.findById(req.decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in user's pantry" });
    }

    user.pantry.pull({ _id: req.params.itemId });
    await user.save();

    res.json({ message: "Item deleted from user's pantry" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting pantry item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const user = await User.findById(req.decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in user's pantry" });
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
