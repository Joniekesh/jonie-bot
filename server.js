import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import authRoute from "./routes/auth.js";
import { Configuration, OpenAIApi } from "openai";
import Chat from "./models/chat.js";
import auth from "./middleware/auth.js";

dotenv.config();
connectDB();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/api/openai", auth, async (req, res) => {
	const { prompt } = req.body;

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 0,
			max_tokens: 3000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		const newChat = new Chat({
			user: req.user.id,
			prompt: req.body.prompt,
			response: completion.data.choices[0].text.replace(/[\r\n]/gm, ""),
		});

		const savedChat = await newChat.save();

		res.status(201).json(savedChat);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.get("/api/openai", auth, async (req, res) => {
	try {
		const chats = await Chat.find({ user: req.user.id }).populate("user");

		if (!chats) return res.status(404).json("Chats not found.");

		res.status(200).json(chats);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`SERVER running on PORT ${process.env.PORT}`.green.bold)
);
