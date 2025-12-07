import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Booking from "./pages/booking/Booking.jsx";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={ <Home/> } />
			<Route path="/list" element={ <List/> } />
			<Route path="/booking" element={ <Booking /> } />
		</Routes>
	)
}