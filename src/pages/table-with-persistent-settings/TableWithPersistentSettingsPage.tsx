import { useCallback, useMemo } from 'react'
import { useTableWithPersistentSettingsList } from './model'
import { useInfinityScroll } from './model/hooks/use-infinity-scroll'
import { useSearchParamsPagination } from '@/shared/query-params/use-search-params-pagination'
import { useTableSettingsSyncUrl } from './model/hooks/use-table-settings-sync-url'
import { tableWithPersistentSettingsColumns } from './model/const/columns'
import { tableWithPersistentSettingsQueryParamsConfig } from './model/const/query-params'
import { SearchFilter } from './ui/search-filter'
import { StatusFilter } from './ui/status-filter'
import { TableWithPersistentSettings } from '@/shared/components/table-with-persistent-settings'
import { TypographyH1 } from '@/shared/components/typography'

const ENABLE_INFINITY_SCROLL = true

const VIRTUAL_SCROLL_CONFIG = {
	containerHeight: 500,
	estimateRowHeight: 44,
	overscan: 5,
} as const

export const TableWithPersistentSettingsPage = () => {
	const { data, filteredCount, isLoading } = useTableWithPersistentSettingsList()
	const tableStore = useTableSettingsSyncUrl()

	const {
		data: infinityScrollData,
		handleLoadMore,
		isLoadingMore,
		hasMore,
	} = useInfinityScroll()

	const { onChange, page, pageSize } = useSearchParamsPagination({
		config: tableWithPersistentSettingsQueryParamsConfig,
		keys: { pageKey: 'page', pageSizeKey: 'page_size' },
	})

	const currentPage = typeof page === 'number' ? page : 1
	const currentPageSize = typeof pageSize === 'number' ? pageSize : 10

	const handlePageChange = useCallback(
		(newPage: number) => {
			onChange(newPage, currentPageSize)
		},
		[onChange, currentPageSize]
	)

	const filtersSlot = useMemo(
		() => (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SearchFilter isLoading={isLoading} />
				<StatusFilter isLoading={isLoading} />
			</div>
		),
		[isLoading]
	)

	const infinityScrollConfig = useMemo(
		() =>
			ENABLE_INFINITY_SCROLL
				? {
						onLoadMore: handleLoadMore,
						isLoadingMore,
						hasMore,
					}
				: undefined,
		[handleLoadMore, isLoadingMore, hasMore]
	)

	const paginationConfig = useMemo(
		() =>
			!ENABLE_INFINITY_SCROLL
				? {
						totalCount: filteredCount,
						onPageChange: handlePageChange,
						currentPage,
						pageSize: currentPageSize,
					}
				: undefined,
		[filteredCount, handlePageChange, currentPage, currentPageSize]
	)

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Table with persistent settings</TypographyH1>
			<TableWithPersistentSettings
				data={ENABLE_INFINITY_SCROLL ? infinityScrollData : data}
				columns={tableWithPersistentSettingsColumns}
				tableStore={tableStore}
				columnLock={{
					visibility: ['id', 'name'],
					order: ['id'],
				}}
				virtualScrollConfig={VIRTUAL_SCROLL_CONFIG}
				{...(ENABLE_INFINITY_SCROLL && infinityScrollConfig
					? { infinityScrollConfig }
					: { paginationConfig: paginationConfig! })}
				isLoading={isLoading}
				filtersSlot={filtersSlot}
			/>
		</div>
	)
}
