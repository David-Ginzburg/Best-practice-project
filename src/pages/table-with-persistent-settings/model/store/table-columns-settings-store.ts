import { createColumnsSettingsStore } from '@/shared/store/columns-settings-store'
import { getDefaultColumnConfigs } from '../utils/column-utils'

const STORAGE_NAME = 'table-with-persistent-settings-columns-settings'
const STORAGE_VERSION = 1 // Increment version for migration

export const useTableColumnsSettingsStore = createColumnsSettingsStore({
	storageName: STORAGE_NAME,
	storageVersion: STORAGE_VERSION,
	defaultColumns: getDefaultColumnConfigs(),
})
