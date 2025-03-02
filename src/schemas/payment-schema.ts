import { z } from "zod";

// Define the form schema with Zod
export const paymentFormSchema = z.object({
	id: z.string().min(1, "ID is required"),
	amount: z.coerce.number().positive("Amount must be positive"),
	name: z.string().min(2, "Name must be at least 2 characters"),
	dateDue: z.date({
		required_error: "Due date is required",
	}),
});
