import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../globals.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./app/signup/page.tsx";
import LoginPage from "./app/login/page.tsx";
import DashboardLayout from "./app/dashboard/layout.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import NotFound from "./app/notfound/page.tsx";
import Dashboard from "./app/dashboard/page.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>
);
