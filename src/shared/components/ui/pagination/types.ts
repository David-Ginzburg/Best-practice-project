export type PageNumber = number | "ellipsis";

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	pageNumbers: PageNumber[];
	onPageChange: (page: number) => void;
	className?: string;
}
