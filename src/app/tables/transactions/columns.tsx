import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
	transaction_id: number;
	amount_paid: number;
	payment_method: string;
	transaction_reference: string;
	status: string;
	transaction_date: Date;
	submission_id: number;
};

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "transaction_id",
		header: "Txn ID",
	},
	{
		accessorKey: "amount_paid",
		header: "Amount Paid",
	},
	{
		accessorKey: "payment_method",
		header: "Payment Method",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const { status } = row.original;

			return (
				<div>
					{status == "pending" && (
						<Badge className="bg-orange-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
					{status == "approved" && (
						<Badge className="bg-green-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
					{status == "rejected" && (
						<Badge className="bg-red-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "transaction_date",
		header: "Transaction Date",
		cell: ({ row }) => {
			const { transaction_date } = row.original;
			const formattedDate = new Date(transaction_date).toDateString();

			return (
				<>
					<div>{formattedDate}</div>
				</>
			);
		},
	},
];
