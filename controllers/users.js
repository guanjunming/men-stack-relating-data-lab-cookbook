const User = require("../models/Users.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      { username: { $ne: req.decoded.username } }, // exclude current user
      "username"
    );
    res.json({ users });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error retrieving users" });
  }
};

const getUserItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ pantry: user.pantry });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error getting user's pantry items" });
  }
};

module.exports = { getUsers, getUserItems };
