import { useMemo } from 'react'
import {
	type ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	getGroupedRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Table } from '@/shared/shadcn/ui/table'
import type { TableWithPersistentSettingsConfig } from './types'
import { TableHeaderComponent } from './components/table-header'
import { TableBodyComponent } from './components/table-body'
import { TablePagination } from './components/pagination'
import { InfinityScrollTrigger } from './components/infinity-scroll-trigger'
import { ColumnsSettings } from './components/columns-settings'
import { generateColumnLabels } from './utils/column-utils'

export const TableWithPersistentSettings = <
	TData,
	TColumns extends readonly ColumnDef<TData>[] = ColumnDef<TData>[],
>({
	data,
	columns,
	tableStore,
	columnLock,
	paginationConfig,
	infinityScrollConfig,
	isLoading = false,
	filtersSlot,
}: TableWithPersistentSettingsConfig<TData, TColumns>) => {
	const columnLabels = useMemo(
		() =>
			generateColumnLabels(columns),
		[columns]
	)

	const {
		columnVisibility,
		setColumnVisibility,
		columnOrder,
		setColumnOrder,
		sorting,
		setSorting,
		grouping,
		setGrouping,
		expanded,
		setExpanded,
	} = tableStore

	const table = useReactTable({
		data,
		columns: columns as unknown as ColumnDef<TData>[],
		getCoreRowModel: getCoreRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		manualSorting: true,
		state: {
			columnVisibility,
			columnOrder,
			sorting,
			grouping,
			expanded,
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onGroupingChange: setGrouping,
		onExpandedChange: setExpanded,
	})

	return (
		<>
			<div className="mb-6 space-y-4">
				{filtersSlot}
				<div className="flex justify-end">
					<ColumnsSettings
					table={table}
					columnLabels={columnLabels}
					setColumnOrder={setColumnOrder}
					columnLock={columnLock}
				/>
				</div>
			</div>

			{isLoading ? (
				<div className="mb-6 overflow-hidden rounded-md border">
					<div className="h-102 w-full animate-pulse bg-muted" />
				</div>
			) : (
				<div className="mb-6 overflow-hidden rounded-md border">
					<Table>
						<TableHeaderComponent table={table} />
						<TableBodyComponent
							table={table}
							columnsLength={columns.length}
						/>
					</Table>
				</div>
			)}

			{paginationConfig && !isLoading && !infinityScrollConfig && (
				<TablePagination
					totalCount={paginationConfig.totalCount}
					currentPage={paginationConfig.currentPage}
					pageSize={paginationConfig.pageSize}
					onPageChange={paginationConfig.onPageChange}
				/>
			)}

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
