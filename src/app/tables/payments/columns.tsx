import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
	id: string;
	amount: number;
	name: string;
	dateDue: Date;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
	{
		accessorKey: "dateDue",
		header: "Due Date",
	},
];
