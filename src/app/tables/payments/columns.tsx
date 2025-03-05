import { ColumnDef } from "@tanstack/react-table";

export type Submission = {
	submission_id: number;
	total_amount: number;
	status: "pending" | "complete" | "incomplete";
	submitted_at: Date;
	student_id: number;
};

export const columns: ColumnDef<Submission>[] = [
	{
		accessorKey: "submission_id",
		header: "submission ID",
	},
	{
		accessorKey: "total_amount",
		header: "Total Amount",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "submitted_at",
		header: "Submitted At",
	},
];
