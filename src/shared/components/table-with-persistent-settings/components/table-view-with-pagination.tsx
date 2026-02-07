import type { Table } from '@tanstack/react-table'
import type { PaginationConfig } from '../types'
import { TableContent } from './table-content'
import { TablePagination } from './pagination'

interface TableViewWithPaginationProps<TData> {
	isLoading: boolean
	table: Table<TData>
	columnsLength: number
	paginationConfig: PaginationConfig
}

export function TableViewWithPagination<TData>({
	isLoading,
	table,
	columnsLength,
	paginationConfig,
}: TableViewWithPaginationProps<TData>) {
	return (
		<>
			<TableContent
				isLoading={isLoading}
				table={table}
				columnsLength={columnsLength}
			/>
			{!isLoading && (
				<TablePagination
					totalCount={paginationConfig.totalCount}
					currentPage={paginationConfig.currentPage}
					pageSize={paginationConfig.pageSize}
					onPageChange={paginationConfig.onPageChange}
				/>
			)}
		</>
	)
}
