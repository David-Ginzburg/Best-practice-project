import { useRef } from 'react'
import type { Table } from '@tanstack/react-table'
import type { VirtualScrollConfig, InfinityScrollConfig } from '../types'
import { TableContent } from './table-content'
import { InfinityScrollTrigger } from './infinity-scroll-trigger'

interface TableViewWithInfinityScrollProps<TData> {
	isLoading: boolean
	table: Table<TData>
	columnsLength: number
	infinityScrollConfig: InfinityScrollConfig
	virtualScrollConfig?: VirtualScrollConfig
	grouping: string[]
}

export function TableViewWithInfinityScroll<TData>({
	isLoading,
	table,
	columnsLength,
	infinityScrollConfig,
	virtualScrollConfig,
	grouping,
}: TableViewWithInfinityScrollProps<TData>) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	return (
		<>
			<TableContent
				isLoading={isLoading}
				table={table}
				columnsLength={columnsLength}
				virtualScrollConfig={virtualScrollConfig}
				scrollContainerRef={virtualScrollConfig ? scrollContainerRef : undefined}
				infinityScrollConfig={infinityScrollConfig}
			/>
			{!isLoading && !virtualScrollConfig && (
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
