import type { TicketStatus } from "./types";

export const STATUS_CONFIG: Record<
	TicketStatus,
	{
		label: string;
		color: string;
	}
> = {
	open: {
		label: "Open",
		color: "text-blue-600",
	},
	in_progress: {
		label: "In Progress",
		color: "text-yellow-600",
	},
	resolved: {
		label: "Resolved",
		color: "text-green-600",
	},
	closed: {
		label: "Closed",
		color: "text-gray-600",
	},
};
