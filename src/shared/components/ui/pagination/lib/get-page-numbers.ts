export type PageNumber = number | "ellipsis";

interface GetPageNumbersParams {
	currentPage: number;
	totalPages: number;
	maxVisible?: number;
}

export const getPageNumbers = ({
	currentPage,
	totalPages,
	maxVisible = 5,
}: GetPageNumbersParams): PageNumber[] => {
	const pages: PageNumber[] = [];

	if (totalPages <= maxVisible) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		if (currentPage <= 3) {
			for (let i = 1; i <= 4; i++) {
				pages.push(i);
			}
			pages.push("ellipsis");
			pages.push(totalPages);
		} else if (currentPage >= totalPages - 2) {
			pages.push(1);
			pages.push("ellipsis");
			for (let i = totalPages - 3; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			pages.push("ellipsis");
			for (let i = currentPage - 1; i <= currentPage + 1; i++) {
				pages.push(i);
			}
			pages.push("ellipsis");
			pages.push(totalPages);
		}
	}

	return pages;
};

