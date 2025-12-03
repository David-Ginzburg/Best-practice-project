import { useState, useMemo } from "react";
import type { Ticket, TicketStatus, TicketPriority } from "@/entities/ticket";
import { generateMockTickets } from "@/entities/ticket";

interface UseTicketListParams {
	searchQuery: string;
	statusFilter: TicketStatus | "all";
	priorityFilter: TicketPriority | "all";
}

export const useTicketList = ({
	searchQuery,
	statusFilter,
	priorityFilter,
}: UseTicketListParams) => {
	const [tickets] = useState<Ticket[]>(generateMockTickets());

	const filteredTickets = useMemo(() => {
		return tickets.filter((ticket) => {
			const matchesSearch =
				searchQuery === "" ||
				ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
			const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;

			return matchesSearch && matchesStatus && matchesPriority;
		});
	}, [tickets, searchQuery, statusFilter, priorityFilter]);

	return {
		tickets,
		filteredTickets,
	};
};

