import { useMemo } from "react";
import { useTicketListParams, useTicketList } from "../model";
import { TicketFilters, TicketTable, TicketListInfo } from "./";
import { Pagination } from "@/shared/components/pagination";
import { usePagination } from "@/shared/lib/pagination";

const ITEMS_PER_PAGE = 10;

export const TicketList = () => {
	const { params, setFilters, setPage } = useTicketListParams();
	const { searchQuery, statusFilter, priorityFilter, page } = params;

	const { tickets, filteredTickets } = useTicketList({
		searchQuery,
		statusFilter,
		priorityFilter,
	});

	const { totalPages, startIndex, endIndex, pageNumbers } = usePagination({
		currentPage: page,
		totalItems: filteredTickets.length,
		itemsPerPage: ITEMS_PER_PAGE,
	});

	const paginatedTickets = useMemo(() => {
		return filteredTickets.slice(startIndex, endIndex);
	}, [filteredTickets, startIndex, endIndex]);

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
				currentPage={page}
				totalPages={totalPages}
				pageNumbers={pageNumbers}
				onPageChange={setPage}
			/>
			<TicketListInfo
				shownCount={paginatedTickets.length}
				filteredCount={filteredTickets.length}
				totalCount={tickets.length}
			/>
		</>
	);
};

