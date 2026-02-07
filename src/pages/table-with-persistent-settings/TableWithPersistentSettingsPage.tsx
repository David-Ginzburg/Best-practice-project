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

export const TableWithPersistentSettingsPage = () => {
	const { data, filteredCount, isLoading } = useTableWithPersistentSettingsList()
	const tableStore = useTableSettingsSyncUrl()

	const {
		data: infinityScrollData,
		handleLoadMore,
		isLoadingMore,
		hasMore,
	} = useInfinityScroll()

	const enableInfinityScroll = true

	const { onChange, page, pageSize } = useSearchParamsPagination({
		config: tableWithPersistentSettingsQueryParamsConfig,
		keys: { pageKey: 'page', pageSizeKey: 'page_size' },
	})

	const currentPage = typeof page === 'number' ? page : 1
	const currentPageSize = typeof pageSize === 'number' ? pageSize : 10

	const handlePageChange = (newPage: number) => {
		onChange(newPage, currentPageSize)
	}

	const filtersSlot = (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<SearchFilter isLoading={isLoading} />
			<StatusFilter isLoading={isLoading} />
		</div>
	)

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Table with persistent settings</TypographyH1>
			<TableWithPersistentSettings
				data={enableInfinityScroll ? infinityScrollData : data}
				columns={tableWithPersistentSettingsColumns}
				tableStore={tableStore}
				columnLock={{
					visibility: ['id', 'name'],
					order: ['id'],
				}}
				{...(enableInfinityScroll
					? {
							infinityScrollConfig: {
								onLoadMore: handleLoadMore,
								isLoadingMore: isLoadingMore,
								hasMore: hasMore,
							},
						}
					: {
							paginationConfig: {
								totalCount: filteredCount,
								onPageChange: handlePageChange,
								currentPage,
								pageSize: currentPageSize,
							},
						})}
				isLoading={isLoading}
				filtersSlot={filtersSlot}
			/>
		</div>
	)
}
