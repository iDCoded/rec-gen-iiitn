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
import Dashboard from "./app/dashboard/dashboard-page.tsx";
import PaymentsTable from "./app/tables/payments/page.tsx";
import TransactionsTable from "./app/tables/transactions/page.tsx";
import PaymentPage from "./app/submit/payment/page.tsx";
import TransactionPage from "./app/submit/transaction/page.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<DashboardLayout />}>
						<Route path="payments" element={<PaymentsTable />} />
						<Route path="transactions" element={<TransactionsTable />} />
						<Route index element={<Dashboard />} />
						<Route path="/submit/payment" element={<PaymentPage />} />
						<Route path="/submit/transaction" element={<TransactionPage />} />
					</Route>
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</AuthProvider>
	</StrictMode>
);
