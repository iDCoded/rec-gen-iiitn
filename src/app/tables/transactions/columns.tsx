import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
	id: string;
	no_of_payments: number;
	transaction_id: number;
	payment_pic: File;
	verified: boolean;
	payment_datetime: Date;
	Payments_id: number;
	user_id: number;
};

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "payment_pic.name",
		header: "Name",
	},
	{
		accessorKey: "verified",
		header: "Verified",
	},
	{
		accessorKey: "payment_datetime",
		header: "Payment Date",
	},
];
