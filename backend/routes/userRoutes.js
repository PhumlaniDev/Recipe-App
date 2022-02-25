const express = require("express");
const route = express.Router();
const {
	getUser,
	registerUser,
	loginUser,
} = require("../controller/userController");
const { protect } = require("../middleware/auth");

route.get("/me", protect, getUser);
route.post("/", registerUser);
route.post("/login", loginUser);

module.exports = route;
