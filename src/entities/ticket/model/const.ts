import type { TicketStatus, TicketPriority } from "./types";

export const TICKET_STATUSES: TicketStatus[] = ["open", "in_progress", "resolved", "closed"];

export const TICKET_PRIORITIES: TicketPriority[] = ["low", "medium", "high", "urgent"];
