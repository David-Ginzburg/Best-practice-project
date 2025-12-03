import { useMemo } from "react";
import { getPageNumbers } from "@/shared/components/pagination";

const DEFAULT_ITEMS_PER_PAGE = 10;

interface UsePaginationParams {
	currentPage: number;
	totalItems: number;
	itemsPerPage?: number;
}

export const usePagination = ({
	currentPage,
	totalItems,
	itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UsePaginationParams) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const pageNumbers = useMemo(() => {
		return getPageNumbers({ currentPage, totalPages });
	}, [currentPage, totalPages]);

	return {
		currentPage,
		totalPages,
		startIndex,
		endIndex,
		pageNumbers,
	};
};

