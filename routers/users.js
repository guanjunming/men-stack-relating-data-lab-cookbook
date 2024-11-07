const express = require("express");
const usersController = require("../controllers/users");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:userId", usersController.getUserItems);

module.exports = router;
