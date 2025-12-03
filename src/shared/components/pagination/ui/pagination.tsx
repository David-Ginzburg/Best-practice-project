import {
	Pagination as ShadcnPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/shared/shadcn/ui/pagination";
import type { PaginationProps } from "../types";
import { cn } from "@/shared/lib/utils";

export const Pagination = ({
	currentPage,
	totalPages,
	pageNumbers,
	onPageChange,
	className,
}: PaginationProps) => {
	if (totalPages <= 1) {
		return null;
	}

	const handlePageClick = (page: number, e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (currentPage !== page) {
			onPageChange(page);
		}
	};

	const handlePreviousClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<ShadcnPagination className={cn(className)}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={handlePreviousClick}
						className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
					/>
				</PaginationItem>

				{pageNumbers.map((page, index) => {
					if (page === "ellipsis") {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					return (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								onClick={(e) => handlePageClick(page, e)}
								isActive={currentPage === page}
								style={{ cursor: "pointer" }}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={handleNextClick}
						className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
					/>
				</PaginationItem>
			</PaginationContent>
		</ShadcnPagination>
	);
};

