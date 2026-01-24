import { Pagination } from '@/shared/components/pagination'
import { usePagination } from '@/shared/lib/pagination'

interface TablePaginationProps {
	totalCount: number
	currentPage: number
	pageSize: number
	onPageChange: (page: number) => void
}

export const TablePagination = ({
	totalCount,
	currentPage,
	pageSize,
	onPageChange,
}: TablePaginationProps) => {
	const { totalPages, pageNumbers } = usePagination({
		currentPage,
		totalItems: totalCount,
		itemsPerPage: pageSize,
	})

	if (totalPages <= 1) {
		return null
	}

	return (
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			pageNumbers={pageNumbers}
			onPageChange={onPageChange}
		/>
	)
}
