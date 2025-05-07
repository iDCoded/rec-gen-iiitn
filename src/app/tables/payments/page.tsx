// import { useState } from "react";
import { Submission, columns } from "./columns";
import { DataTable } from "./data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Mock data for payment submissions
const mockPaymentData: Submission[] = [
	{
		submission_id: 1001,
		total_amount: 45000,
		status: "complete",
		submitted_at: new Date("2025-04-15"),
		student_id: 23001,
	},
	{
		submission_id: 1002,
		total_amount: 38500,
		status: "pending",
		submitted_at: new Date("2025-05-02"),
		student_id: 23045,
	},
	{
		submission_id: 1003,
		total_amount: 42000,
		status: "incomplete",
		submitted_at: new Date("2025-04-28"),
		student_id: 23078,
	},
	{
		submission_id: 1004,
		total_amount: 40000,
		status: "complete",
		submitted_at: new Date("2025-04-10"),
		student_id: 23022,
	},
	{
		submission_id: 1005,
		total_amount: 45000,
		status: "pending",
		submitted_at: new Date("2025-05-05"),
		student_id: 23056,
	},
];

export default function PaymentsTable() {
	return (
		<div className="w-full max-w-4xl mx-auto py-6">
			<Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-800">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Demo Data</AlertTitle>
				<AlertDescription>
					This table displays mock payment data for demonstration purposes.
					Backend integration is not active yet, and all data shown is
					fictional.
				</AlertDescription>
			</Alert>

			<DataTable columns={columns} data={mockPaymentData} />
		</div>
	);
}
