import axios from "axios";
import { useState } from "react";
import "./chatForm.css";

const ChatForm = ({ chats, setChats }) => {
	const [prompt, setPrompt] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const currentUser = JSON.parse(localStorage.getItem("user"));
	const TOKEN = currentUser?.token;
	const user = currentUser?.user;

	const config = {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!prompt) {
			setTimeout(() => {
				setError("");
			}, 5000);
			return setError("Request is required!");
		} else {
			setLoading(true);
			try {
				const res = await axios.post(
					"https://jonie-bot.onrender.com/api/openai",
					{
						prompt,
					},
					config
				);
				setChats([...chats, res.data]);
				setPrompt("");
				setLoading(false);
				console.log(res.data);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	return (
		<div className="chatForm" onSubmit={onSubmit}>
			{error && <span className="error">{error}</span>}
			<form className="cForm" onSubmit={onSubmit}>
				{loading ? (
					"Processing..."
				) : (
					<input
						className="chatFormInput"
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Ask Jonie Bot whatever question you want."
					/>
				)}
				<button type="submit" className="formBtn">
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatForm;
