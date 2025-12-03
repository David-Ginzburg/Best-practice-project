import { StringParam, withDefault } from "use-query-params";
import { useSearchParameters, BASE_PAGINATION_CONFIG } from "@/shared/query-params";
import type { TicketStatus, TicketPriority } from "@/entities/ticket";

export const TICKET_FILTERS_CONFIG = {
	searchQuery: withDefault(StringParam, ""),
	statusFilter: withDefault(StringParam, "all") as typeof StringParam & {
		_default: TicketStatus | "all";
	},
	priorityFilter: withDefault(StringParam, "all") as typeof StringParam & {
		_default: TicketPriority | "all";
	},
} as const;

// Combined config for filters with pagination to ensure page resets when filters change
export const TICKET_FILTERS_WITH_PAGINATION_CONFIG = {
	...BASE_PAGINATION_CONFIG,
	...TICKET_FILTERS_CONFIG,
} as const;

export const useTicketFilters = () => {
	const { params, setListSearchParams } = useSearchParameters(
		TICKET_FILTERS_WITH_PAGINATION_CONFIG
	);

	const searchQuery = (params.searchQuery as string) || "";
	const statusFilter = (params.statusFilter as TicketStatus | "all") || "all";
	const priorityFilter = (params.priorityFilter as TicketPriority | "all") || "all";

	const setFilters = (filters: {
		searchQuery?: string;
		statusFilter?: TicketStatus | "all";
		priorityFilter?: TicketPriority | "all";
	}) => {
		// setListSearchParams automatically resets page to undefined (which becomes default)
		setListSearchParams(filters);
	};

	return {
		searchQuery,
		statusFilter,
		priorityFilter,
		setFilters,
	};
};
