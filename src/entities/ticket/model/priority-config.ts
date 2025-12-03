import type { TicketPriority } from "./types";

export const PRIORITY_CONFIG: Record<
	TicketPriority,
	{
		label: string;
		color: string;
	}
> = {
	low: {
		label: "Low",
		color: "text-gray-600",
	},
	medium: {
		label: "Medium",
		color: "text-blue-600",
	},
	high: {
		label: "High",
		color: "text-orange-600",
	},
	urgent: {
		label: "Urgent",
		color: "text-red-600",
	},
};
