import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getDefaultColumnConfigs } from '../utils/column-utils'

export interface ColumnConfigItem {
	id: string
	visible: boolean
	order: number
}
export interface ColumnsSettingsStore {
	columns: ColumnConfigItem[]
	setVisibleColumn: (params: { field: string; visible: boolean }) => void
	setColumnOrder: (fieldIds: string[]) => void
}

const STORAGE_NAME = 'table-with-persistent-settings-columns-settings'
const STORAGE_VERSION = 1 // Increment version for migration

export const useTableColumnsSettingsStore = create<ColumnsSettingsStore>()(
	devtools(
		persist(
			(set) => ({
				columns: getDefaultColumnConfigs(),
				setVisibleColumn: ({ field, visible }) => {
					set(({ columns }) => {
						const nextColumns = columns.map((columnState) =>
							columnState.id === field
								? { ...columnState, visible }
								: columnState
						)

						return { columns: nextColumns }
					})
				},
				setColumnOrder: (fieldIds) => {
					set(({ columns }) => {
						const orderMap = new Map(fieldIds.map((id, index) => [id, index]))
						const nextColumns = columns.map((column) => ({
							...column,
							order: orderMap.get(column.id) ?? column.order,
						}))

						return { columns: nextColumns }
					})
				},
			}),
			{
				name: STORAGE_NAME,
				version: STORAGE_VERSION,
			}
		)
	)
)
