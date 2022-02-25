const express = require("express");
const router = express.Router();
const {
	getGoal,
	createGoal,
	updateGoal,
	deleteGoal,
} = require("../controller/goalController");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getGoal).post(protect, createGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
