import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.js";
const router = express.Router();

// Register
router.post("/", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user) return res.status(400).json("User already exist.");

		const newUser = new User({
			username,
			email,
			password,
		});

		const savedUser = await newUser.save();

		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) return res.status(400).json("User not found.");

		const isMatch = await bcrypt.compareSync(password, user.password);

		if (!isMatch) return res.status(400).json("Passwords do not match!");

		const token = jwt.sign({ id: user._id }, "jwtSecret");

		res.status(200).json({ user, token });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get Logged in User
router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) return res.status(404).json("User not found.");

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
