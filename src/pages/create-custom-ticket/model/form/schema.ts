import { z } from "zod";

export const customTicketFormSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.min(3, "Title must be at least 3 characters")
		.max(100, "Title must not exceed 100 characters"),
	description: z
		.string()
		.min(1, "Description is required")
		.min(10, "Description must be at least 10 characters")
		.max(1000, "Description must not exceed 1000 characters"),
	priority: z.enum(["low", "medium", "high", "urgent"], {
		message: "Priority is required",
	}),
	customReason: z
		.string()
		.min(1, "Custom reason is required")
		.min(10, "Custom reason must be at least 10 characters")
		.max(500, "Custom reason must not exceed 500 characters"),
	urgencyLevel: z.string().max(50, "Urgency level must not exceed 50 characters").optional(),
});

export type CustomTicketFormData = z.infer<typeof customTicketFormSchema>;

