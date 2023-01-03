import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";

const App = () => {
	const currentUser = JSON.parse(localStorage.getItem("user"));
	const user = currentUser?.user;

	const Private = ({ children }) => {
		return user ? children : <Navigate to="/" />;
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="/chat"
					element={
						<Private>
							<Chat />
						</Private>
					}
				></Route>
			</Routes>
		</Router>
	);
};

export default App;
