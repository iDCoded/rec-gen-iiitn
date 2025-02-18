import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../globals.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./app/signup/page.tsx";
import LoginPage from "./app/login/page.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
