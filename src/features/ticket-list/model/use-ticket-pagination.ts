import { useMemo, useEffect, useCallback } from "react";
import {
	useSearchParamsPagination,
	DEFAULT_PAGE,
	useSearchParameters,
} from "@/shared/query-params";
import { getPageNumbers } from "@/shared/components/ui/pagination";
import { TICKET_FILTERS_WITH_PAGINATION_CONFIG } from "./use-ticket-filters";

const ITEMS_PER_PAGE = 10;

export const TICKET_LIST_CONFIG = TICKET_FILTERS_WITH_PAGINATION_CONFIG;

interface UseTicketPaginationParams {
	filteredTicketsCount: number;
}

export const useTicketPagination = ({ filteredTicketsCount }: UseTicketPaginationParams) => {
	const { page } = useSearchParamsPagination({
		config: TICKET_LIST_CONFIG,
		keys: {
			pageKey: "page",
			pageSizeKey: "page_size",
		},
	});

	const { setSearchParams } = useSearchParameters(TICKET_LIST_CONFIG);

	const totalPages = Math.ceil(filteredTicketsCount / ITEMS_PER_PAGE);

	// Handle null/undefined from query params and validate page value
	const pageValue = page != null ? (page as number) : DEFAULT_PAGE;

	// Reset page in URL if it's greater than total pages
	useEffect(() => {
		if (pageValue > totalPages && totalPages > 0 && pageValue !== DEFAULT_PAGE) {
			setSearchParams({ page: DEFAULT_PAGE });
		}
	}, [pageValue, totalPages, setSearchParams]);

	const currentPage = useMemo(() => {
		if (pageValue > totalPages && totalPages > 0) {
			return DEFAULT_PAGE;
		}
		return pageValue;
	}, [pageValue, totalPages]);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;

	const setCurrentPage = useCallback(
		(newPage: number) => {
			// Directly update page in URL
			setSearchParams({ page: newPage });
		},
		[setSearchParams]
	);

	const pageNumbers = useMemo(() => {
		return getPageNumbers({ currentPage, totalPages });
	}, [currentPage, totalPages]);

	return {
		currentPage,
		totalPages,
		startIndex,
		endIndex,
		setCurrentPage,
		pageNumbers,
	};
};
