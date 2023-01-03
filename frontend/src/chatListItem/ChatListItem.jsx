import "./chatListItem.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatListItem = ({ chat }) => {
	const [user, setUser] = useState(null);

	const currentUser = JSON.parse(localStorage.getItem("user"));
	const TOKEN = currentUser?.token;

	const config = {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/auth/me",
					config
				);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, []);

	return (
		<div className="chatListDetails ">
			<div className="chatListDetailsContainer">
				<div className="userC">
					<div className="chatListTop">
						<img className="chatListUserImg" src="/assets/avatar.jpg" alt="" />
						<span className="chatListUsername">{user?.username}</span>
					</div>
					<div className="chatListBottom">
						<p className="chatListBottomDesc">{chat?.prompt}</p>
					</div>
				</div>
				<div className="botC">
					<div className="chatListTop">
						<img className="chatListUserImg" src="/assets/botLogo.jpg" alt="" />
						<span className="chatListUsername">Jonie Bot</span>
					</div>
					<div className="chatListBottom">
						<p className="chatListBottomDesc">{chat?.response}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatListItem;
