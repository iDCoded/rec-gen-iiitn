import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { paymentFormSchema } from "@/schemas/payment-schema";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

// Infer the type from the schema
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export default function PaymentForm() {
	const { token } = useAuth();

	// Default values for the form
	const defaultValues: Partial<PaymentFormValues> = {
		id: "",
		amount: 0,
		name: "",
		dateDue: new Date(),
	};

	// Initialize the form
	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(paymentFormSchema),
		defaultValues,
	});

	// Handle form submission
	async function onSubmit(values: PaymentFormValues) {
		try {
			const res = await fetch("http://localhost:8000/api/submit/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`, // Send user token for authorization
				},
				body: JSON.stringify({
					...values,
					dateDue: format(new Date(values.dateDue), "yyyy-MM-dd"), // Format the date to yyyy-MM-dd
				}),
			});

			const data = await res.json();

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="w-full max-w-xl mx-auto">
			<CardHeader>
				<CardTitle>Payment Details</CardTitle>
				<CardDescription>Enter the details for your payment.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Payment ID</FormLabel>
									<FormControl>
										<Input placeholder="PAY-123456" {...field} />
									</FormControl>
									<FormDescription>
										Enter a unique identifier for this payment.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
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
									<FormDescription>
										Enter the payment amount in INR.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormDescription>
										Enter the name of the payment recipient.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="dateDue"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
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
												disabled={(date) =>
													date < new Date(new Date().setHours(0, 0, 0, 0))
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>
										Select the date when payment is due.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Submit Payment
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-between text-sm text-muted-foreground">
				<p>All payments are processed securely</p>
			</CardFooter>
		</Card>
	);
}
