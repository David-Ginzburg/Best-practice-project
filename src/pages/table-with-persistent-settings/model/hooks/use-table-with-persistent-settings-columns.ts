import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import type { TableWithPersistentSettingsItem } from '../types/filter-item'
import { tableWithPersistentSettingsColumns } from '../const/columns'
import { useTableColumnsSettingsStore } from '../store/table-columns-settings-store'

export const useTableWithPersistentSettingsColumns = () => {
	const { columns: columnConfigs, setColumnOrder } = useTableColumnsSettingsStore()

	const columns = useMemo(() => {
		// Filter and sort visible columns
		const visibleConfigs = columnConfigs
			.filter((config) => config.visible)
			.sort((a, b) => a.order - b.order)

		// Map configs to column definitions
		const columnDefs: ColumnDef<TableWithPersistentSettingsItem>[] = []

		visibleConfigs.forEach((config) => {
			const originalColumn = tableWithPersistentSettingsColumns.find((col) => {
				if ('accessorKey' in col && typeof col.accessorKey === 'string') {
					return col.accessorKey === config.id
				}
				if ('id' in col && typeof col.id === 'string') {
					return col.id === config.id
				}
				return false
			})

			if (!originalColumn) return

			columnDefs.push(originalColumn)
		})

		return columnDefs
	}, [columnConfigs])

	const columnConfigsList = useMemo(() => {
		return columnConfigs.sort((a, b) => a.order - b.order)
	}, [columnConfigs])

	return {
		columns,
		columnConfigs: columnConfigsList,
		setColumnOrder,
	}
}
