import { type ColumnDef } from '@tanstack/react-table'
import type { ColumnConfigItem } from '@/shared/store/columns-settings-store'

/**
 * Get column ID from column definition
 */
export const getColumnId = <TData>(column: ColumnDef<TData>): string | null => {
	if ('accessorKey' in column && typeof column.accessorKey === 'string') {
		return column.accessorKey
	}
	if ('id' in column && typeof column.id === 'string') {
		return column.id
	}
	return null
}

/**
 * Get column header label from column definition
 */
export const getColumnHeader = <TData>(column: ColumnDef<TData>): string => {
	if (typeof column.header === 'string') {
		return column.header
	}
	if (typeof column.header === 'function') {
		// For function headers, try to extract from accessorKey as fallback
		const id = getColumnId(column)
		return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Unknown'
	}
	const id = getColumnId(column)
	return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Unknown'
}

/**
 * Generate default column configs from columns
 */
export const generateDefaultColumnConfigs = <TData>(
	columns: ColumnDef<TData>[]
): ColumnConfigItem[] => {
	return columns
		.map((column, index) => {
			const id = getColumnId(column)
			if (!id) return null
			return {
				id,
				visible: true,
				order: index,
			}
		})
		.filter((config): config is ColumnConfigItem => config !== null)
}

/**
 * Generate column labels map from columns
 */
export const generateColumnLabels = <TData>(
	columns: ColumnDef<TData>[]
): Record<string, string> => {
	const labels: Record<string, string> = {}
	columns.forEach((column) => {
		const id = getColumnId(column)
		if (id) {
			labels[id] = getColumnHeader(column)
		}
	})
	return labels
}
