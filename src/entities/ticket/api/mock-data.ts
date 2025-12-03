import type { Ticket, TicketStatus, TicketPriority } from "../model/types";

export const generateMockTickets = (): Ticket[] => {
	const statuses: TicketStatus[] = ["open", "in_progress", "resolved", "closed"];
	const priorities: TicketPriority[] = ["low", "medium", "high", "urgent"];
	const assignees = [
		"Ivan Petrov",
		"Maria Sidorova",
		"Alexey Ivanov",
		"Elena Kozlova",
		"Dmitry Smirnov",
	];
	const titles = [
		"Authorization problem",
		"Data loading error",
		"Slow interface performance",
		"Submit button not working",
		"Table display issue",
		"Form validation error",
		"Data export problem",
		"Settings not saving",
		"Print error",
		"Search problem",
	];

	const tickets: Ticket[] = [];
	for (let i = 1; i <= 50; i++) {
		tickets.push({
			id: `TICKET-${String(i).padStart(4, "0")}`,
			title: `${titles[i % titles.length]} #${i}`,
			status: statuses[i % statuses.length],
			priority: priorities[i % priorities.length],
			assignee: assignees[i % assignees.length],
			createdAt: new Date(
				Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
			).toLocaleDateString("en-US"),
		});
	}

	return tickets;
};

