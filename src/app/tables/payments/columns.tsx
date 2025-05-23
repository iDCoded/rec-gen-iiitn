import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
		cell: ({ row }) => {
			const { status } = row.original;

			return (
				<div>
					{status == "complete" && (
						<Badge className="bg-blue-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
					{status == "pending" && (
						<Badge className="bg-orange-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
					{status == "incomplete" && (
						<Badge className="bg-red-500">
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "submitted_at",
		header: "Submitted At",
		cell: ({ row }) => {
			const { submitted_at } = row.original;
			const formattedDate = new Date(submitted_at).toDateString();

			return (
				<>
					<div>{formattedDate}</div>
				</>
			);
		},
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(payment.submission_id.toString());
								toast.success("Copied to clipboard.");
							}}>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Approve Payment</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
