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
			<div className="flex min-h-screen">
				<DashboardSidebar user={user} />
				<SidebarTrigger />
				<div className="flex-1 flex justify-center items-center p-4 w-[80vw]">
					<Outlet context={{ user }} /> {/* Pass user object as context */}
				</div>
			</div>
		</SidebarProvider>
	);
}
