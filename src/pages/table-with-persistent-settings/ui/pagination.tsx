import { useSearchParamsPagination } from '@/shared/query-params/use-search-params-pagination'
import { useTableWithPersistentSettingsQueryParamsConfig } from '../model/hooks/use-table-with-persistent-settings-query-params-config'
import { Pagination } from '@/shared/components/pagination'
import { usePagination } from '@/shared/lib/pagination'

interface TableWithPersistentSettingsPaginationProps {
	totalCount: number
}

export const TableWithPersistentSettingsPagination = ({ totalCount }: TableWithPersistentSettingsPaginationProps) => {
	const queryParamsConfig = useTableWithPersistentSettingsQueryParamsConfig()
	
	const { onChange, page, pageSize } = useSearchParamsPagination({
		config: queryParamsConfig,
		keys: { pageKey: 'page', pageSizeKey: 'page_size' },
	})

	const currentPage = typeof page === 'number' ? page : 1
	const currentPageSize = typeof pageSize === 'number' ? pageSize : 10

	const { totalPages, pageNumbers } = usePagination({
		currentPage,
		totalItems: totalCount,
		itemsPerPage: currentPageSize,
	})

	if (totalPages <= 1) {
		return null
	}

	const handlePageChange = (newPage: number) => {
		onChange(newPage, currentPageSize)
	}

	return (
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			pageNumbers={pageNumbers}
			onPageChange={handlePageChange}
		/>
	)
}
