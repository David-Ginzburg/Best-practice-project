import { useTicketFilters, useTicketList, useTicketPagination } from "@/features/ticket-list";
import { TicketFilters, TicketTable, TicketListInfo } from "./ui";
import { Pagination } from "@/shared/components/ui/pagination";

export const TicketList = () => {
	const { searchQuery, statusFilter, priorityFilter, setFilters } = useTicketFilters();

	const { tickets, filteredTickets } = useTicketList({
		searchQuery,
		statusFilter,
		priorityFilter,
	});

	const { currentPage, totalPages, startIndex, endIndex, setCurrentPage, pageNumbers } =
		useTicketPagination({
			filteredTicketsCount: filteredTickets.length,
		});

	const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

	return (
		<>
			<TicketFilters
				searchQuery={searchQuery}
				statusFilter={statusFilter}
				priorityFilter={priorityFilter}
				onSearchChange={(value) => setFilters({ searchQuery: value })}
				onStatusChange={(value) => setFilters({ statusFilter: value })}
				onPriorityChange={(value) => setFilters({ priorityFilter: value })}
			/>
			<TicketTable tickets={paginatedTickets} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				pageNumbers={pageNumbers}
				onPageChange={setCurrentPage}
			/>
			<TicketListInfo
				shownCount={paginatedTickets.length}
				filteredCount={filteredTickets.length}
				totalCount={tickets.length}
			/>
		</>
	);
};
