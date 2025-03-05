import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { feeSubmissionSchema } from "@/schemas/fee-submission-schema";

// Infer the type from the schema
type FeeSubmissionValues = z.infer<typeof feeSubmissionSchema>;

export default function FeeSubmissionForm() {
	const { token, user } = useAuth();

	// Default values for the form
	const defaultValues: Partial<FeeSubmissionValues> = {
		total_amount: 0,
		status: "pending",
		submitted_at: new Date(),
	};

	// Initialize the form
	const form = useForm<FeeSubmissionValues>({
		resolver: zodResolver(feeSubmissionSchema),
		defaultValues,
	});

	// Handle form submission
	async function onSubmit(values: FeeSubmissionValues) {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/fee_submissions/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
					body: JSON.stringify({
						...values,
						submitted_at: format(new Date(values.submitted_at), "yyyy-MM-dd"),
						student: user?.student_id,
					}),
				}
			);

			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="w-full max-w-xl mx-auto">
			<CardHeader>
				<CardTitle>Fee Submission</CardTitle>
				<CardDescription>
					Enter the details for your fee submission.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="total_amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total Amount</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute left-3 top-1.5">₹</span>
											<Input
												type="number"
												placeholder="0.00"
												className="pl-7"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="submitted_at"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Submission Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Submit Fee
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-between text-sm text-muted-foreground">
				<p>All submissions are securely processed.</p>
			</CardFooter>
		</Card>
	);
}
