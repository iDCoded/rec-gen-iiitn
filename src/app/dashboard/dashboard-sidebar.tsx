import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// TODO: Extract sidebar data to parent layout component
// TODO: Make Sidebar menu button active based on path
const DashboardSidebar = ({ user }: { user: User }) => {
	return (
		<div>
			<Sidebar variant="floating">
				<SidebarHeader className="font-bold text-center bg-secondary">
					<Link to={"/"}>Payment Dashboard</Link>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Tables</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to={"/payments"}>All Payments</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to={"/transactions"}>All Transactions</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Forms</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to={"/submit/payment"}>Payment Form</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to={"/submit/transaction"}>Transactions Form</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>{user.first_name}</SidebarFooter>
			</Sidebar>
		</div>
	);
};

export default DashboardSidebar;
