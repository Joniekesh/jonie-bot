import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		img: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSaltSync(10);

	this.password = await bcrypt.hashSync(this.password, salt);

	next();
});

export default mongoose.model("User", UserSchema);
