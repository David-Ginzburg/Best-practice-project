import type { Table as TanStackTable } from '@tanstack/react-table'
import { Table } from '@/shared/shadcn/ui/table'
import type { VirtualScrollConfig, InfinityScrollConfig } from '../types'
import { TableHeaderComponent } from './table-header'
import { TableBodyComponent } from './table-body'
import { VirtualTableLayout } from './virtual-table-layout'

interface TableContentProps<TData> {
	isLoading: boolean
	table: TanStackTable<TData>
	columnsLength: number
	virtualScrollConfig?: VirtualScrollConfig
	scrollContainerRef?: React.RefObject<HTMLDivElement | null>
	infinityScrollConfig?: InfinityScrollConfig
}

export function TableContent<TData>({
	isLoading,
	table,
	columnsLength,
	virtualScrollConfig,
	scrollContainerRef,
	infinityScrollConfig,
}: TableContentProps<TData>) {
	if (isLoading) {
		return (
			<div className="mb-6 overflow-hidden rounded-md border">
				<div className="h-102 w-full animate-pulse bg-muted" />
			</div>
		)
	}

	if (virtualScrollConfig && scrollContainerRef) {
		return (
			<VirtualTableLayout
				table={table}
				virtualScrollConfig={virtualScrollConfig}
				scrollContainerRef={scrollContainerRef}
				columnsLength={columnsLength}
				infinityScrollConfig={infinityScrollConfig}
			/>
		)
	}

	return (
		<div className="mb-6 overflow-hidden rounded-md border">
			<Table>
				<TableHeaderComponent table={table} />
				<TableBodyComponent
					table={table}
					columnsLength={columnsLength}
				/>
			</Table>
		</div>
	)
}
