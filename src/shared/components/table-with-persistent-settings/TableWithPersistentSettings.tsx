import { useMemo } from 'react'
import {
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Table } from '@/shared/shadcn/ui/table'
import { createColumnsSettingsStore } from '@/shared/store/columns-settings-store'
import type { TableWithPersistentSettingsConfig } from './types'
import { useTableColumns } from './hooks/use-table-columns'
import { TableHeaderComponent } from './components/table-header'
import { TableBodyComponent } from './components/table-body'
import { TablePagination } from './components/pagination'
import { InfinityScrollTrigger } from './components/infinity-scroll-trigger'
import { ColumnsSettings } from './components/columns-settings'
import { generateDefaultColumnConfigs, generateColumnLabels } from './utils/column-utils'

export const TableWithPersistentSettings = <TData,>({
	data,
	columns: allColumns,
	sortConfig,
	storeConfig,
	paginationConfig,
	infinityScrollConfig,
	isLoading = false,
	filtersSlot,
}: TableWithPersistentSettingsConfig<TData>) => {
	// Generate default column configs and labels from columns
	const defaultColumnConfigs = useMemo(
		() => generateDefaultColumnConfigs(allColumns),
		[allColumns]
	)

	const columnLabels = useMemo(
		() => generateColumnLabels(allColumns),
		[allColumns]
	)

	// Create store hook once and reuse it
	// Store will be recreated if storeConfig or defaultColumnConfigs change
	const useTableColumnsSettingsStore = useMemo(
		() =>
			createColumnsSettingsStore({
				storageName: storeConfig.storageName,
				storageVersion: storeConfig.storageVersion,
				defaultColumns: defaultColumnConfigs,
			}),
		[storeConfig.storageName, storeConfig.storageVersion, defaultColumnConfigs]
	)

	const store = useTableColumnsSettingsStore()
	const { columns: columnConfigs } = store

	// Get filtered and sorted columns
	const { columns, columnConfigs: sortedColumnConfigs } = useTableColumns({
		allColumns,
		columnConfigs,
	})

	// Create table instance
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		...(sortConfig && {
			getSortedRowModel: getSortedRowModel(),
			state: {
				sorting: sortConfig.sortingState,
			},
			manualSorting: true,
			onSortingChange: sortConfig.onSortingChange,
		}),
	})

	return (
		<>
			{/* Filters slot */}
			<div className="mb-6 space-y-4">
				{filtersSlot}
				<div className="flex justify-end">
					<ColumnsSettings
						columnConfigs={sortedColumnConfigs}
						columnLabels={columnLabels}
						store={store}
					/>
				</div>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="mb-6 overflow-hidden rounded-md border">
					<div className="h-102 w-full animate-pulse bg-muted" />
				</div>
			) : (
				<div
					className="mb-6 overflow-hidden rounded-md border"
				>
					<Table>
						<TableHeaderComponent table={table} />
						<TableBodyComponent table={table} columnsLength={columns.length} />
					</Table>
				</div>
			)}

			{/* Pagination */}
			{paginationConfig && !isLoading && !infinityScrollConfig && (
				<TablePagination
					totalCount={paginationConfig.totalCount}
					currentPage={paginationConfig.currentPage}
					pageSize={paginationConfig.pageSize}
					onPageChange={paginationConfig.onPageChange}
				/>
			)}

			{/* Infinity Scroll */}
			{infinityScrollConfig && !isLoading && (
				<InfinityScrollTrigger
					onLoadMore={infinityScrollConfig.onLoadMore}
					isLoadingMore={infinityScrollConfig.isLoadingMore}
					hasMore={infinityScrollConfig.hasMore}
				/>
			)}
		</>
	)
}
