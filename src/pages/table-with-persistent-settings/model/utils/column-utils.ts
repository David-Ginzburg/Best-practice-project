import type { ColumnConfigItem } from '@/shared/store/columns-settings-store'
import { tableWithPersistentSettingsColumns } from '../const/columns'
import { generateDefaultColumnConfigs as generateDefaultColumnConfigsShared, generateColumnLabels as generateColumnLabelsShared } from '@/shared/components/table-with-persistent-settings/utils/column-utils'

/**
 * Generate default column configs from tableWithPersistentSettingsColumns
 * @deprecated Use generateDefaultColumnConfigs from shared/utils/column-utils instead
 */
export const getDefaultColumnConfigs = (): ColumnConfigItem[] => {
	return generateDefaultColumnConfigsShared(tableWithPersistentSettingsColumns)
}

/**
 * Generate column labels map from tableWithPersistentSettingsColumns
 * @deprecated Use generateColumnLabels from shared/utils/column-utils instead
 */
export const getColumnLabels = (): Record<string, string> => {
	return generateColumnLabelsShared(tableWithPersistentSettingsColumns)
}
