import type { Ticket } from "../model/types";
import { TICKET_STATUSES, TICKET_PRIORITIES } from "../model/const";

/**
 * Generate mock tickets data
 * @returns Promise that resolves after 1 second with mock tickets array
 */
export const getTickets = async (): Promise<Ticket[]> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const statuses = TICKET_STATUSES;
	const priorities = TICKET_PRIORITIES;
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

	// Simple seeded random function for deterministic randomness
	const seededRandom = (seed: number) => {
		const x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	};

	const tickets: Ticket[] = [];
	for (let i = 1; i <= 50; i++) {
		const statusSeed = i * 7;
		const prioritySeed = i * 11;
		const dateSeed = i * 13;

		tickets.push({
			id: `TICKET-${String(i).padStart(4, "0")}`,
			title: `${titles[i % titles.length]} #${i}`,
			status: statuses[Math.floor(seededRandom(statusSeed) * statuses.length)],
			priority: priorities[Math.floor(seededRandom(prioritySeed) * priorities.length)],
			assignee: assignees[i % assignees.length],
			createdAt: new Date(
				Date.now() - seededRandom(dateSeed) * 30 * 24 * 60 * 60 * 1000
			).toLocaleDateString("en-US"),
		});
	}

	return tickets;
};
