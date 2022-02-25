const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: [true, "Please enter a goal name."],
		},
	},
	{
		timestamps: true,
	}
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
