import { useMemo } from 'react'
import {
	type ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	getGroupedRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import type { TableWithPersistentSettingsConfig } from './types'
import { TableFiltersSection } from './components/table-filters-section'
import { TableViewWithPagination } from './components/table-view-with-pagination'
import { TableViewWithInfinityScroll } from './components/table-view-with-infinity-scroll'
import { generateColumnLabels } from './utils/column-utils'

export const TableWithPersistentSettings = <
	TData,
	TColumns extends readonly ColumnDef<TData>[] = ColumnDef<TData>[],
>({
	data,
	columns,
	tableStore,
	columnLock,
	virtualScrollConfig,
	paginationConfig,
	infinityScrollConfig,
	isLoading = false,
	filtersSlot,
}: TableWithPersistentSettingsConfig<TData, TColumns>) => {
	const columnLabels = useMemo(
		() => generateColumnLabels(columns),
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
		getRowId: (row, index) => {
			const r = row as { id?: unknown }
			return r?.id != null ? String(r.id) : `row-${index}`
		},
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
			<TableFiltersSection
				filtersSlot={filtersSlot}
				table={table}
				columnLabels={columnLabels}
				setColumnOrder={setColumnOrder}
				columnLock={columnLock}
			/>

			{infinityScrollConfig ? (
				<TableViewWithInfinityScroll
					isLoading={isLoading}
					table={table}
					columnsLength={columns.length}
					infinityScrollConfig={infinityScrollConfig}
					virtualScrollConfig={virtualScrollConfig}
					grouping={grouping}
				/>
			) : paginationConfig ? (
				<TableViewWithPagination
					isLoading={isLoading}
					table={table}
					columnsLength={columns.length}
					paginationConfig={paginationConfig}
				/>
			) : null}
		</>
	)
}
