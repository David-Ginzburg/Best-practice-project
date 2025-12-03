import { StringParam, withDefault } from "use-query-params";
import { BASE_PAGINATION_CONFIG, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/shared/query-params";
import type { TicketStatus, TicketPriority } from "@/entities/ticket";

export const ticketListDefaultParamsConfig = {
	page: DEFAULT_PAGE,
	pageSize: DEFAULT_PAGE_SIZE,
	searchQuery: "",
	statusFilter: "all" as TicketStatus | "all",
	priorityFilter: "all" as TicketPriority | "all",
};

export const useTicketListQueryParamsConfig = () => {
	return {
		...BASE_PAGINATION_CONFIG,
		searchQuery: withDefault(StringParam, ticketListDefaultParamsConfig.searchQuery),
		statusFilter: withDefault(
			StringParam,
			ticketListDefaultParamsConfig.statusFilter
		) as typeof StringParam & {
			_default: TicketStatus | "all";
		},
		priorityFilter: withDefault(
			StringParam,
			ticketListDefaultParamsConfig.priorityFilter
		) as typeof StringParam & {
			_default: TicketPriority | "all";
		},
	};
};

