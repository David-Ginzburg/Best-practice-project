import type { ColumnConfigItem } from '@/shared/store/columns-settings-store'
import { tableWithPersistentSettingsColumns } from '../const/columns'
import { generateColumnLabels, generateDefaultColumnConfigs } from '@/shared/components/table-with-persistent-settings'

export const getDefaultColumnConfigs = (): ColumnConfigItem[] => {
	return generateDefaultColumnConfigs(tableWithPersistentSettingsColumns)
}

export const getColumnLabels = (): Record<string, string> => {
	return generateColumnLabels(tableWithPersistentSettingsColumns)
}
