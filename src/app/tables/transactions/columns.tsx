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
