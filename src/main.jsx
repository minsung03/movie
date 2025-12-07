import "./index.css"
import "./App.css";
import App from "./App.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import MovieProvider from "./util/movieUtil.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<MovieProvider>
			<div className="h-screen app">
				<Header />
				<main className="app-main">
					<App />
				</main>
				<Footer />
			</div>
		</MovieProvider>
	</BrowserRouter>
)