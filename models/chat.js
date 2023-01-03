import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		prompt: {
			type: String,
			required: true,
		},
		response: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
