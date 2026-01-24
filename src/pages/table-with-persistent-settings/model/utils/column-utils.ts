import { type ColumnDef } from '@tanstack/react-table'
import type { TableWithPersistentSettingsItem } from '../types/filter-item'
import type { ColumnConfigItem } from '../store/table-columns-settings-store'
import { tableWithPersistentSettingsColumns } from '../const/columns'

/**
 * Get column ID from column definition
 */
const getColumnId = (column: ColumnDef<TableWithPersistentSettingsItem>): string | null => {
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
const getColumnHeader = (column: ColumnDef<TableWithPersistentSettingsItem>): string => {
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
 * Generate default column configs from tableWithPersistentSettingsColumns
 */
export const getDefaultColumnConfigs = (): ColumnConfigItem[] => {
	return tableWithPersistentSettingsColumns
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
 * Generate column labels map from tableWithPersistentSettingsColumns
 */
export const getColumnLabels = (): Record<string, string> => {
	const labels: Record<string, string> = {}
	tableWithPersistentSettingsColumns.forEach((column) => {
		const id = getColumnId(column)
		if (id) {
			labels[id] = getColumnHeader(column)
		}
	})
	return labels
}
