import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/chat" element={<Chat />}></Route>
			</Routes>
		</Router>
	);
};

export default App;
