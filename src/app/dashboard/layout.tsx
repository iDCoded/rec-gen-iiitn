import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Only redirect if loading is complete and user is still null.
		if (!loading && !user) {
			navigate("/login");
		}
	}, [user, loading, navigate]);

	if (loading) {
		// Optionally, display a loading spinner or message.
		return <div>Loading...</div>; // TODO: Make a loading screen.
	}

	if (!user) {
		return null;
	}

	return (
		<SidebarProvider>
			<DashboardSidebar user={user} />
			<SidebarTrigger />
			<main>
				<Outlet context={{ user }} /> {/* Pass user object as context */}
			</main>
		</SidebarProvider>
	);
}
