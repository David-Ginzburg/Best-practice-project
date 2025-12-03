import { useMemo } from "react";
import type { Ticket, TicketStatus, TicketPriority } from "@/entities/ticket";
import { useTicketListQuery } from "@/entities/ticket";

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
	const { data: tickets = [], isLoading } = useTicketListQuery();

	const filteredTickets = useMemo(() => {
		return tickets.filter((ticket: Ticket) => {
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
		isLoading,
	};
};

