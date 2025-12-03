import { useSearchParameters } from "@/shared/query-params";
import { useTicketListQueryParamsConfig } from "./use-ticket-list-query-params-config";
import type { TicketStatus, TicketPriority } from "@/entities/ticket";

export const useTicketListParams = () => {
	const ticketListQueryParamsConfig = useTicketListQueryParamsConfig();

	const { params, setSearchParams, setListSearchParams } = useSearchParameters(
		ticketListQueryParamsConfig,
		{
			pageKey: "page",
		}
	);

	const searchQuery = (params.searchQuery as string) || "";
	const statusFilter = (params.statusFilter as TicketStatus | "all") || "all";
	const priorityFilter = (params.priorityFilter as TicketPriority | "all") || "all";
	const page = (params.page as number) || 1;
	const pageSize = (params.page_size as number) || 20;

	const setFilters = (filters: {
		searchQuery?: string;
		statusFilter?: TicketStatus | "all";
		priorityFilter?: TicketPriority | "all";
	}) => {
		setListSearchParams(filters);
	};

	const setPage = (newPage: number) => {
		setSearchParams({ page: newPage });
	};

	return {
		params: {
			searchQuery,
			statusFilter,
			priorityFilter,
			page,
			pageSize,
		},
		setFilters,
		setPage,
	};
};

