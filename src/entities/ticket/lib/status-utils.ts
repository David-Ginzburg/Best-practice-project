import type { TicketStatus, TicketPriority } from "../model/types";

export const getStatusColor = (status: TicketStatus): string => {
	switch (status) {
		case "open":
			return "text-blue-600";
		case "in_progress":
			return "text-yellow-600";
		case "resolved":
			return "text-green-600";
		case "closed":
			return "text-gray-600";
		default:
			return "";
	}
};

export const getStatusLabel = (status: TicketStatus): string => {
	const labels: Record<TicketStatus, string> = {
		open: "Open",
		in_progress: "In Progress",
		resolved: "Resolved",
		closed: "Closed",
	};
	return labels[status];
};

export const getPriorityColor = (priority: TicketPriority): string => {
	switch (priority) {
		case "low":
			return "text-gray-600";
		case "medium":
			return "text-blue-600";
		case "high":
			return "text-orange-600";
		case "urgent":
			return "text-red-600";
		default:
			return "";
	}
};

export const getPriorityLabel = (priority: TicketPriority): string => {
	const labels: Record<TicketPriority, string> = {
		low: "Low",
		medium: "Medium",
		high: "High",
		urgent: "Urgent",
	};
	return labels[priority];
};

