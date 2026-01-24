import {
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Table } from '@/shared/shadcn/ui/table'
import type { TableWithPersistentSettingsItem } from '../model/types/filter-item'
import { useTableWithPersistentSettingsSorting } from '../model/hooks/use-table-with-persistent-settings-sorting'
import { useTableWithPersistentSettingsColumns } from '../model'
import { TableWithPersistentSettingsTableHeader } from './table-header'
import { TableWithPersistentSettingsTableBody } from './table-body'

interface TableWithPersistentSettingsTableProps {
	data: TableWithPersistentSettingsItem[]
	isLoading?: boolean
}

export const TableWithPersistentSettingsTable = ({
	data,
	isLoading = false,
}: TableWithPersistentSettingsTableProps) => {
	const { columns } = useTableWithPersistentSettingsColumns()
	const { sortingState, onSortingChange } = useTableWithPersistentSettingsSorting()

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: sortingState,
		},
		manualSorting: true,
		onSortingChange,
	})

	if (isLoading) {
		return (
			<div className="mb-6 overflow-hidden rounded-md border">
				<div className="h-102 w-full animate-pulse bg-muted" />
			</div>
		)
	}

	return (
		<div
			className="mb-6 overflow-hidden rounded-md border"
			style={{ viewTransitionName: 'table-with-persistent-settings-table' }}
		>
			<Table>
				<TableWithPersistentSettingsTableHeader table={table} />
				<TableWithPersistentSettingsTableBody table={table} columnsLength={columns.length} />
			</Table>
		</div>
	)
}
