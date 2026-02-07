import type { Table as TanStackTableType } from '@tanstack/react-table'
import type { VirtualScrollConfig, InfinityScrollConfig } from '../types'
import { TableHeaderComponent } from './table-header'
import { TableBodyComponent } from './table-body'
import { InfinityScrollTrigger } from './infinity-scroll-trigger'

const SCROLLBAR_GUTTER = 17
const DEFAULT_COL_WIDTH = 150

export interface VirtualTableLayoutProps<TData> {
	table: TanStackTableType<TData>
	virtualScrollConfig: VirtualScrollConfig
	scrollContainerRef: React.RefObject<HTMLDivElement | null>
	columnsLength: number
	infinityScrollConfig?: InfinityScrollConfig
}

export function VirtualTableLayout<TData>({
	table,
	virtualScrollConfig,
	scrollContainerRef,
	columnsLength,
	infinityScrollConfig,
}: VirtualTableLayoutProps<TData>) {
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
