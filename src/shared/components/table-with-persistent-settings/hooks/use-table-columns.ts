import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import type { ColumnConfigItem } from '@/shared/store/columns-settings-store'

interface UseTableColumnsParams<TData> {
	allColumns: ColumnDef<TData>[]
	columnConfigs: ColumnConfigItem[]
}

/**
 * Hook to manage table columns based on settings from store
 */
export const useTableColumns = <TData>({
	allColumns,
	columnConfigs,
}: UseTableColumnsParams<TData>) => {
	const columns = useMemo(() => {
		// Filter and sort visible columns
		const visibleConfigs = columnConfigs
			.filter((config) => config.visible)
			.sort((a, b) => a.order - b.order)

		// Map configs to column definitions
		const columnDefs: ColumnDef<TData>[] = []

		visibleConfigs.forEach((config) => {
			const originalColumn = allColumns.find((col) => {
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
	}, [allColumns, columnConfigs])

	const sortedColumnConfigs = useMemo(() => {
		return columnConfigs.sort((a, b) => a.order - b.order)
	}, [columnConfigs])

	return {
		columns,
		sortedColumnConfigs,
	}
}
