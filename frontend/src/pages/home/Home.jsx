import "./home.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isRegister, setIsRegister] = useState(false);

	const navigate = useNavigate();

	const currentUser = JSON.parse(localStorage.getItem("user"));
	const user = currentUser?.user;

	useEffect(() => {
		if (user) {
			navigate("/chat");
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isRegister) {
				if (password !== confirmPassword) {
					setTimeout(() => {
						setError("");
					}, 5000);
					return setError("Passwords do not match.");
				} else {
					const newUser = {
						username,
						email,
						password,
					};

					const res = await axios.post(
						"http://localhost:5000/api/auth",
						newUser
					);
					setIsRegister(false);
				}
			} else {
				const res = await axios.post("http://localhost:5000/api/auth/login", {
					username,
					password,
				});
				localStorage.setItem("user", JSON.stringify(res.data));
				navigate("/chat");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="home">
			{error && <span className="error">{error}</span>}
			<div className="color1"></div>
			<div className="color2"></div>
			<div className="homeContainer">
				<h2 className="homeTitle">Chat with a Robot</h2>
				<h3 className="regLoginTitle">{isRegister ? "Register" : "Login"}</h3>
				<form>
					<div className="inputGroup">
						<label>Username:</label>
						<input
							type="text"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					{isRegister && (
						<div className="inputGroup">
							<label>Email:</label>
							<input
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					)}
					<div className="inputGroup">
						<label>Password:</label>
						<input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{isRegister && (
						<div className="inputGroup">
							<label>Confirm Password:</label>
							<input
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					)}
					<button className="authBtn" onClick={handleSubmit}>
						{isRegister ? "Register" : "Login"}
					</button>
				</form>
				{isRegister ? "Already have an account?" : "Don't have an account?"}
				<Link onClick={() => setIsRegister(!isRegister)}>
					{isRegister ? "Login" : "Register"}
				</Link>
			</div>
		</div>
	);
};

export default Home;
