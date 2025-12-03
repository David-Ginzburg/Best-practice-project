export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Ticket {
	id: string;
	title: string;
	status: TicketStatus;
	priority: TicketPriority;
	assignee: string;
	createdAt: string;
}

export interface TicketFilters {
	searchQuery: string;
	statusFilter: TicketStatus | "all";
	priorityFilter: TicketPriority | "all";
}

