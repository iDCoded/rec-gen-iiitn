import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Mock data for transactions
const mockTransactionData: Transaction[] = [
	{
		transaction_id: 5001,
		amount_paid: 45000,
		payment_method: "upi",
		transaction_reference: "UPI/123456789012",
		status: "approved",
		transaction_date: new Date("2025-04-16"),
		submission_id: 1001,
	},
	{
		transaction_id: 5002,
		amount_paid: 38500,
		payment_method: "bank_transfer",
		transaction_reference: "NEFT/IIIT2023005",
		status: "pending",
		transaction_date: new Date("2025-05-03"),
		submission_id: 1002,
	},
	{
		transaction_id: 5003,
		amount_paid: 12000,
		payment_method: "card",
		transaction_reference: "CARD/HDFC/TX98765",
		status: "approved",
		transaction_date: new Date("2025-04-28"),
		submission_id: 1003,
	},
	{
		transaction_id: 5004,
		amount_paid: 30000,
		payment_method: "upi",
		transaction_reference: "UPI/987654321098",
		status: "rejected",
		transaction_date: new Date("2025-04-20"),
		submission_id: 1004,
	},
	{
		transaction_id: 5005,
		amount_paid: 25000,
		payment_method: "bank_transfer",
		transaction_reference: "IMPS/IIIT2023089",
		status: "pending",
		transaction_date: new Date("2025-05-05"),
		submission_id: 1005,
	},
];

export default function TransactionsTable() {
	return (
		<div className="w-full max-w-4xl mx-auto py-6">
			<Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-800">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Demo Data</AlertTitle>
				<AlertDescription>
					This table displays mock transaction data for demonstration purposes.
					Backend integration is pending, and all transaction records shown are
					fictional.
				</AlertDescription>
			</Alert>

			<DataTable columns={columns} data={mockTransactionData} />
		</div>
	);
}
