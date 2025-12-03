/**
 * Centralized application routes/paths
 * All page paths should be defined here and imported from this file
 */

export const PATHS = {
	ticketList: "/ticket-list",
	createTicket: "/create-ticket",
	createCustomTicket: "/create-custom-ticket",
} as const;

export type Path = (typeof PATHS)[keyof typeof PATHS];

