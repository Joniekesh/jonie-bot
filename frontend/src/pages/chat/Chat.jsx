import "./chat.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatForm from "../../components/chatForm/ChatForm";
import ChatListItem from "../../chatListItem/ChatListItem";
import { useRef } from "react";

const Chat = () => {
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(false);
	const scrollRef = useRef();

	const currentUser = JSON.parse(localStorage.getItem("user"));
	const TOKEN = currentUser?.token;


	const config = {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	useEffect(() => {
		const fetchChats = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					"https://jonie-bot.onrender.com/api/openai",
					config
				);
				setChats(res.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		};
		fetchChats();
	}, []);

	const handleLeave = () => {
		localStorage.removeItem("user");
		window.location.replace("/");
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [chats]);

	return (
		<div className="chat">
			<div className="chatContainer">
				<div className="chatTop">
					<div className="topLeft">
						<Link to="/">
							<span className="arrow">
								<i className="fa-solid fa-arrow-left"></i>
							</span>
						</Link>
						<img className="botImg" src="/assets/botLogo.jpg" alt="" />
						<span className="topTitle">jonieBot</span>
					</div>
					<div className="toRight" onClick={handleLeave}>
						Leave
					</div>
				</div>
				<div className="chatMiddle">
					{loading ? (
						"Loading..."
					) : chats.length > 0 ? (
						chats.map((chat) => <ChatListItem chat={chat} key={chat._id} />)
					) : (
						<span className="noChats">
							Not chats yet. You can start by asking Jonie Bot whatever you
							want.
						</span>
					)}
					<div ref={scrollRef}></div>
				</div>
				<div className="chatBottom">
					<ChatForm chats={chats} setChats={setChats} />
				</div>
			</div>
		</div>
	);
};

export default Chat;
