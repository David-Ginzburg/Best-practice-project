import type { Table, Updater } from '@tanstack/react-table'
import type { ColumnSettingsLock } from '../types'
import { ColumnsSettings } from './columns-settings'

interface TableFiltersSectionProps<TData> {
	filtersSlot?: React.ReactNode
	table: Table<TData>
	columnLabels: Record<string, string>
	setColumnOrder: (updater: Updater<string[]>) => void
	columnLock?: ColumnSettingsLock
}

export function TableFiltersSection<TData>({
	filtersSlot,
	table,
	columnLabels,
	setColumnOrder,
	columnLock,
}: TableFiltersSectionProps<TData>) {
	return (
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
	)
}
