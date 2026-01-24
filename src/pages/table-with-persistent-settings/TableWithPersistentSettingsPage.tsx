import { useTableWithPersistentSettingsList } from './model'
import { useTableWithPersistentSettingsSorting } from './model/hooks/use-table-with-persistent-settings-sorting'
import { useInfinityScroll } from './model/hooks/use-infinity-scroll'
import { useSearchParamsPagination } from '@/shared/query-params/use-search-params-pagination'
import { useTableWithPersistentSettingsQueryParamsConfig } from './model/hooks/use-table-with-persistent-settings-query-params-config'
import { tableWithPersistentSettingsColumns } from './model/const/columns'
import { SearchFilter } from './ui/search-filter'
import { StatusFilter } from './ui/status-filter'
import { TableWithPersistentSettings } from '@/shared/components/table-with-persistent-settings'
import { TypographyH1 } from '@/shared/components/typography'

const STORAGE_NAME = 'table-with-persistent-settings-columns-settings'
const STORAGE_VERSION = 1

export const TableWithPersistentSettingsPage = () => {
	const { data, filteredCount, isLoading } = useTableWithPersistentSettingsList()
	const { sortingState, onSortingChange } = useTableWithPersistentSettingsSorting()
	const queryParamsConfig = useTableWithPersistentSettingsQueryParamsConfig()

	// Infinity scroll hook
	const {
		data: infinityScrollData,
		handleLoadMore,
		isLoadingMore,
		hasMore,
	} = useInfinityScroll()

	// Use infinity scroll for testing (comment out paginationConfig to test infinity scroll)
	const enableInfinityScroll = false
	
	const { onChange, page, pageSize } = useSearchParamsPagination({
		config: queryParamsConfig,
		keys: { pageKey: 'page', pageSizeKey: 'page_size' },
	})

	const currentPage = typeof page === 'number' ? page : 1
	const currentPageSize = typeof pageSize === 'number' ? pageSize : 10

	const handlePageChange = (newPage: number) => {
		onChange(newPage, currentPageSize)
	}

	// Prepare filters slot (without ColumnsSettings, as it's built into the universal component)
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
				sortConfig={{
					sortingState,
					onSortingChange,
				}}
				storeConfig={{
					storageName: STORAGE_NAME,
					storageVersion: STORAGE_VERSION,
				}}
				paginationConfig={!enableInfinityScroll ? {
					totalCount: filteredCount,
					onPageChange: handlePageChange,
					currentPage,
					pageSize: currentPageSize,
				} : undefined}
				infinityScrollConfig={enableInfinityScroll ? {
					onLoadMore: handleLoadMore,
					isLoadingMore: isLoadingMore,
					hasMore: hasMore,
				} : undefined}
				isLoading={isLoading}
				filtersSlot={filtersSlot}
			/>
		</div>
	)
}
