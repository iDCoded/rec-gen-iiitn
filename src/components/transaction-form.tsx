/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Mock data for payments and users
// Fetch this from an API
const PAYMENTS = [
	{ id: 1, name: "UPI" },
	{ id: 2, name: "Bank Transfer" },
	{ id: 3, name: "PayPal" },
];

// Form schema based on the Django model
const formSchema = z.object({
	payment: z.string({
		required_error: "Please select a payment method",
	}),
	name: z.string().min(1, "User name is required"),
	no_of_payments: z.coerce
		.number()
		.int()
		.min(1, "Number of payments must be at least 1"),
	transaction_id: z.string().min(1, "Transaction ID is required"),
	payment_pic: z
		.instanceof(FileList)
		.refine((files) => files.length > 0, "Payment proof image is required")
		.refine(
			(files) => {
				const file = files[0];
				return (
					["image/jpeg", "image/png", "image/gif"].includes(file.type) &&
					file.size <= 5 * 1024 * 1024
				);
			},
			{
				message:
					"File must be an image (JPEG, PNG, GIF) and less than 5MB in size",
			}
		),
	verified: z.boolean().default(false),
	payment_datetime: z.date({
		required_error: "Please select a date and time",
	}),
});

type FormValues = z.infer<typeof formSchema>;

export default function TransactionForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const { token, user } = useAuth();

	// Initialize the form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			no_of_payments: 1,
			verified: false,
			payment_datetime: new Date(),
		},
	});

	// Handle form submission
	async function onSubmit(values: FormValues) {
		setIsSubmitting(true);

		try {
			const { name, payment, payment_pic, ...transactionData } = values;
			console.log("Form values:", { ...transactionData, user: user?.id });

			// const res = await fetch("http://localhost:8000/api/submit/transaction", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `Token ${token}`,
			// 	},
			// 	body: JSON.stringify({ ...transactionData, user: user?.id }),
			// });

			// const data = await res.json();

			// toast({
			// 	title: "Transaction submitted",
			// 	description: "Your transaction has been successfully recorded.",
			// });

			// Reset form
			form.reset({});
			setPreviewUrl(null);
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	// Handle image preview
	const handleImageChange = (files: FileList | null) => {
		if (files && files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
		}
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Payment Selection */}
							<FormField
								control={form.control}
								name="payment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Payment Method</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a payment method" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PAYMENTS.map((payment) => (
													<SelectItem
														key={payment.id}
														value={payment.id.toString()}>
														{payment.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* User Selection */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>User</FormLabel>
										<FormControl>
											<Input placeholder="Enter your name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Number of Payments */}
							<FormField
								control={form.control}
								name="no_of_payments"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Number of Payments</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={1}
												{...field}
												onChange={(e) => field.onChange(e.target.valueAsNumber)}
											/>
										</FormControl>
										<FormDescription>
											Enter the number of installments
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Transaction ID */}
							<FormField
								control={form.control}
								name="transaction_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Transaction ID</FormLabel>
										<FormControl>
											<Input placeholder="Enter transaction ID" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Payment Date and Time */}
							<FormField
								control={form.control}
								name="payment_datetime"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Payment Date & Time</FormLabel>
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
															format(field.value, "PPP HH:mm")
														) : (
															<span>Pick a date and time</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={(date) => {
														if (date) {
															const currentDate = field.value || new Date();
															date.setHours(currentDate.getHours());
															date.setMinutes(currentDate.getMinutes());
															field.onChange(date);
														}
													}}
													initialFocus
												/>
												<div className="p-3 border-t border-border">
													<Input
														type="time"
														value={
															field.value
																? format(field.value, "HH:mm")
																: "00:00"
														}
														onChange={(e) => {
															const [hours, minutes] = e.target.value
																.split(":")
																.map(Number);
															const newDate = new Date(
																field.value || new Date()
															);
															newDate.setHours(hours);
															newDate.setMinutes(minutes);
															field.onChange(newDate);
														}}
													/>
												</div>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Payment Image Upload */}
						<FormField
							control={form.control}
							name="payment_pic"
							render={({ field: { value, onChange, ...fieldProps } }) => (
								<FormItem>
									<FormLabel htmlFor="image">Payment Proof</FormLabel>
									<FormControl>
										<div className="grid gap-4">
											<Input
												type="file"
												id="image"
												accept="image/*"
												onChange={(e) => {
													onChange(e.target.files);
													handleImageChange(e.target.files);
												}}
												{...fieldProps}
											/>
											{previewUrl && (
												<div className="mt-2 border rounded-md overflow-hidden">
													<img
														src={previewUrl || "/placeholder.svg"}
														alt="Payment proof preview"
														className="max-h-48 object-contain mx-auto"
													/>
												</div>
											)}
										</div>
									</FormControl>
									<FormDescription>
										Upload an image of your payment proof (JPEG, PNG, GIF, max
										5MB)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit Transaction"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
