import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout() {
	const { user: authUser, loading } = useAuth();
	const navigate = useNavigate();
	const [isDemoMode] = useState(true); // Set to true for presentation mode

	// Mock user data for presentation
	const mockUser: User = {
		id: 0,
		student_id: 1,
		username: "bt24csh023",
		first_name: "Dhruv",
		last_name: "-",
		email: "bt24csh023@iiitn.ac.in",
	};

	// Use either the authenticated user or the mock user
	const user = isDemoMode ? mockUser : authUser;

	useEffect(() => {
		// Only redirect if not in demo mode, loading is complete, and user is null
		if (!isDemoMode && !loading && !authUser) {
			navigate("/login");
		}
	}, [authUser, loading, navigate, isDemoMode]);

	if (loading && !isDemoMode) {
		return <div>Loading...</div>; // TODO: Make a loading screen.
	}

	// Only check for null user if not in demo mode
	if (!user && !isDemoMode) {
		return null;
	}

	return (
		<div className="min-h-screen">
			<SidebarProvider>
				<div className="flex flex-col min-h-screen">
					<div className="flex flex-1">
						{user && <DashboardSidebar user={user} />}
						<SidebarTrigger />
						<div className="flex-1 flex justify-center items-center p-4 w-[80vw]">
							<Outlet context={{ user }} /> {/* Pass user object as context */}
						</div>
					</div>
				</div>
			</SidebarProvider>
		</div>
	);
}
