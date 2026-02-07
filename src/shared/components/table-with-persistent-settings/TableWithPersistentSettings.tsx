import { useMemo, useRef } from 'react'
import {
	type ColumnDef,
	type Table as TanStackTableType,
	getCoreRowModel,
	getSortedRowModel,
	getGroupedRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Table } from '@/shared/shadcn/ui/table'
import type {
	TableWithPersistentSettingsConfig,
	VirtualScrollConfig,
	InfinityScrollConfig,
} from './types'
import { TableHeaderComponent } from './components/table-header'
import { TableBodyComponent } from './components/table-body'
import { TablePagination } from './components/pagination'
import { InfinityScrollTrigger } from './components/infinity-scroll-trigger'
import { ColumnsSettings } from './components/columns-settings'
import { generateColumnLabels } from './utils/column-utils'

const SCROLLBAR_GUTTER = 17
const DEFAULT_COL_WIDTH = 150

function VirtualTableLayout<TData>({
	table,
	virtualScrollConfig,
	scrollContainerRef,
	columnsLength,
	infinityScrollConfig,
}: {
	table: TanStackTableType<TData>
	virtualScrollConfig: VirtualScrollConfig
	scrollContainerRef: React.RefObject<HTMLDivElement | null>
	columnsLength: number
	infinityScrollConfig?: InfinityScrollConfig
}) {
	const headers = table.getHeaderGroups()[0].headers
	const colWidths = headers.map((h) => h.column.getSize() || DEFAULT_COL_WIDTH)
	const totalWidth = colWidths.reduce((sum, w) => sum + w, 0)

	return (
		<div
			className="mb-6 overflow-x-auto rounded-md border"
			style={{ overflowY: 'hidden' }}
		>
			<div
				style={{
					width: totalWidth + SCROLLBAR_GUTTER,
					minWidth: totalWidth + SCROLLBAR_GUTTER,
				}}
				className="flex flex-col"
			>
				<div style={{ width: totalWidth, flexShrink: 0 }}>
					<table
						className="caption-bottom text-sm"
						style={{
							tableLayout: 'fixed',
							width: totalWidth,
						}}
					>
						<colgroup>
							{headers.map((header, i) => (
								<col
									key={header.id}
									style={{ width: colWidths[i] }}
								/>
							))}
						</colgroup>
						<TableHeaderComponent table={table} />
					</table>
				</div>
				<div
					ref={scrollContainerRef}
					style={{
						height: virtualScrollConfig.containerHeight,
						minHeight: virtualScrollConfig.containerHeight,
						flex: '0 0 auto',
						overflowY: 'auto',
						overflowX: 'hidden',
						width: totalWidth + SCROLLBAR_GUTTER,
						scrollbarGutter: 'stable',
					}}
				>
					<table
						className="caption-bottom text-sm [&_td]:min-h-10 [&_td]:align-middle"
						style={{
							tableLayout: 'fixed',
							width: totalWidth,
						}}
					>
						<colgroup>
							{headers.map((header, i) => (
								<col
									key={header.id}
									style={{ width: colWidths[i] }}
								/>
							))}
						</colgroup>
						<TableBodyComponent
							table={table}
							columnsLength={columnsLength}
						/>
					</table>
					{infinityScrollConfig && (
						<InfinityScrollTrigger
							scrollContainerRef={scrollContainerRef}
							onLoadMore={infinityScrollConfig.onLoadMore}
							isLoadingMore={infinityScrollConfig.isLoadingMore}
							hasMore={infinityScrollConfig.hasMore}
							manualOnly={table.getState().grouping.length > 0}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

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
	const scrollContainerRef = useRef<HTMLDivElement>(null)
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
			) : virtualScrollConfig ? (
				<VirtualTableLayout
					table={table}
					virtualScrollConfig={virtualScrollConfig}
					scrollContainerRef={scrollContainerRef}
					columnsLength={columns.length}
					infinityScrollConfig={infinityScrollConfig}
				/>
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

			{infinityScrollConfig && !isLoading && !virtualScrollConfig && (
				<InfinityScrollTrigger
					onLoadMore={infinityScrollConfig.onLoadMore}
					isLoadingMore={infinityScrollConfig.isLoadingMore}
					hasMore={infinityScrollConfig.hasMore}
					manualOnly={grouping.length > 0}
				/>
			)}
		</>
	)
}
