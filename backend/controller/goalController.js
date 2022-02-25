const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");

// Get all the Goals
const getGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.find({ user: req.user.id });

	res.status(200).json(goal);
});

// Create  a Goal
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error("Field must be filled out");
	}

	const goal = await Goal.create({
		name: req.body.name,
		user: req.user.id,
	});

	res.status(200).json(goal);
});

// Update a Goal
const updateGoal = asyncHandler(async (req, res) => {
	const goalId = await Goal.findById(req.params.id);

	if (!goalId) {
		res.status(400);
		throw new Error("Goal not found");
	}
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (goalId.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

// Delete a Goal
const deleteGoal = asyncHandler(async (req, res) => {
	const goalId = await Goal.findById(req.params.id);

	if (!goalId) {
		res.status(400);
		throw new Error("Goal not found");
	}

	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (goalId.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await Goal.deleteOne({ id: req.params.id });
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoal,
	createGoal,
	updateGoal,
	deleteGoal,
};
