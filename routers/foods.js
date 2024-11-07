const express = require("express");
const foodsController = require("../controllers/foods");

const router = express.Router();

router.get("/", foodsController.getItems);
router.post("/", foodsController.createItem);
router.delete("/:itemId", foodsController.deleteItem);
router.put("/:itemId", foodsController.updateItem);

module.exports = router;
