import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, AlertCircle } from "lucide-react";
import { DataTable as PaymentsDataTable } from "../tables/payments/data-table";
import { DataTable as TransactionsDataTable } from "../tables/transactions/data-table";
import { columns as PaymentsColumns } from "../tables/payments/columns";
import { columns as TransactionsColumns } from "../tables/transactions/columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
	const isDemoMode = true; // Set to true for presentation mode

	return (
		<div className="flex flex-col gap-6">
			{isDemoMode && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Presentation Mode</AlertTitle>
					<AlertDescription>
						Authentication is currently bypassed for demonstration purposes. No
						actual data is being accessed.
					</AlertDescription>
				</Alert>
			)}

			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Payments
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">₹1,234,567</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Approvals
						</CardTitle>
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">42</div>
						<p className="text-xs text-muted-foreground">+12 since yesterday</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Transactions</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3,784</div>
						<p className="text-xs text-muted-foreground">+201 this week</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="recent">
				<TabsList>
					<TabsTrigger value="recent">Recent Payments</TabsTrigger>
					<TabsTrigger value="pending">Pending Approvals</TabsTrigger>
				</TabsList>
				<TabsContent value="recent" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Recent Payments</CardTitle>
							<CardDescription>
								Overview of the most recent fee payments
							</CardDescription>
						</CardHeader>
						<div className="w-full px-4">
							<PaymentsDataTable columns={PaymentsColumns} data={[]} />
						</div>
						<CardContent></CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="pending" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Pending Approvals</CardTitle>
							<CardDescription>
								Payments waiting for admin approval
							</CardDescription>
						</CardHeader>
						<div className="w-full px-4">
							<TransactionsDataTable columns={TransactionsColumns} data={[]} />
						</div>
						<CardContent></CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
