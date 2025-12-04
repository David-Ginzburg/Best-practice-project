import { z } from "zod";

export const ticketFormSchema = z.object({
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
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;

