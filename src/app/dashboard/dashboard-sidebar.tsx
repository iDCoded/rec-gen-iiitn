import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@/components/ui/sidebar";

const DashboardSidebar = ({ user }: { user: User }) => {
	return (
		<div>
			<Sidebar variant="floating">
				<SidebarHeader>Payment Dashboard</SidebarHeader>
				<SidebarContent>
					<SidebarGroup /> {/* Add different groups here */}
				</SidebarContent>
				<SidebarFooter>{user.first_name}</SidebarFooter>
			</Sidebar>
		</div>
	);
};

export default DashboardSidebar;
