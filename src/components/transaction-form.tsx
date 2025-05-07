import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Payment methods & status options
const PAYMENT_METHODS = [
	{ id: "upi", name: "UPI" },
	{ id: "bank_transfer", name: "Bank Transfer" },
	{ id: "card", name: "Credit/Debit Card" },
];

const STATUS_OPTIONS = [
	{ id: "pending", name: "Pending" },
	{ id: "approved", name: "Approved" },
	{ id: "rejected", name: "Rejected" },
];

// Form schema
const formSchema = z.object({
	submission: z.string().min(1, "Submission ID is required"),
	amount_paid: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format (e.g., 2500.00)"),
	payment_method: z.string({
		required_error: "Please select a payment method",
	}),
	transaction_reference: z.string().min(1, "Transaction reference is required"),
	status: z.string().default("pending"),
	transaction_date: z.date({
		required_error: "Please select a transaction date",
	}),
});

// Infer the type from the schema
type TransactionValues = z.infer<typeof formSchema>;

export default function TransactionForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { token } = useAuth();

	const form = useForm<TransactionValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			status: "pending",
			transaction_date: new Date(),
		},
	});

	async function onSubmit(values: TransactionValues) {
		setIsSubmitting(true);
		try {
			console.log("Submitting transaction:", values);

			const res = await fetch("http://localhost:8000/api/transactions/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(values),
			});

			const data = await res.json();
			console.log("Response:", data);

			form.reset();
		} catch (error) {
			console.error("Submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="w-full max-w-xl mx-auto">
			<Alert
				// variant="warning"
				className="mb-6 border-amber-500 bg-amber-50 text-amber-800">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Development Preview</AlertTitle>
				<AlertDescription>
					This transaction form is currently under development. The interface
					and functionality shown here are preliminary and subject to change.
				</AlertDescription>
			</Alert>

			<Card className="shadow-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">
						Transaction Details
					</CardTitle>
					<CardDescription>
						Enter information about your payment transaction.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="submission"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">Submission ID</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter submission ID"
												className="h-10 rounded-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount_paid"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">Amount Paid</FormLabel>
										<FormControl>
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
													₹
												</span>
												<Input
													placeholder="Enter amount (e.g., 2500.00)"
													className="pl-7 h-10 rounded-md"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Payment Method */}
							<FormField
								control={form.control}
								name="payment_method"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">
											Payment Method
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="h-10 rounded-md">
													<SelectValue placeholder="Select a payment method" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PAYMENT_METHODS.map((method) => (
													<SelectItem key={method.id} value={method.id}>
														{method.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Transaction Reference */}
							<FormField
								control={form.control}
								name="transaction_reference"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">
											Transaction Reference
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter transaction reference"
												className="h-10 rounded-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="h-10 rounded-md">
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{STATUS_OPTIONS.map((status) => (
													<SelectItem key={status.id} value={status.id}>
														{status.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Transaction Date */}
							<FormField
								control={form.control}
								name="transaction_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium">
											Transaction Date
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															"w-full h-10 rounded-md justify-start text-left font-normal border-input",
															!field.value && "text-muted-foreground"
														)}>
														<CalendarIcon className="mr-2 h-4 w-4" />
														{field.value
															? format(field.value, "PPP")
															: "Pick a date"}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent align="start" className="w-auto p-0">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date > new Date()}
													initialFocus
													className="rounded-md border shadow"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full h-10 rounded-md font-medium mt-6">
								{isSubmitting && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isSubmitting ? "Processing..." : "Submit Transaction"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-between text-sm text-muted-foreground border-t py-4">
					<p>All transactions are securely processed and verified.</p>
				</CardFooter>
			</Card>
		</div>
	);
}
