import { z } from "zod";

export const feeSubmissionSchema = z.object({
	total_amount: z.coerce
		.number()
		.min(1, "Amount must be at least 1 INR")
		.max(1000000, "Amount seems too high"),
	status: z.enum(["pending", "incomplete", "complete"]),
	submitted_at: z.date(),
});
