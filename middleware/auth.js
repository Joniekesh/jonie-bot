import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			if (!token)
				return res.status(401).json("No token! Authorization denied.");

			const decoded = jwt.verify(token, "jwtSecret");

			const user = await User.findById(decoded.id);

			req.user = user;
			next();
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("No token");
	}
};

export default auth;
