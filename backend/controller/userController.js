const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// Get all user
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Register a user
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Fields must not be empty");
	}

	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("User already exist");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	User.create(user);
});

// Login
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("Fields must no be empty");
	}

	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			name: user.name,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Email or Password is/are incorrect");
	}
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { getUser, registerUser, loginUser };
