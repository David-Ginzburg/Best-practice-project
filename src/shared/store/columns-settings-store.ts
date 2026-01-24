import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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

export interface CreateColumnsSettingsStoreParams {
	storageName: string
	storageVersion: number
	defaultColumns: ColumnConfigItem[]
}

/**
 * Creates a universal columns settings store with localStorage persistence
 * @param params - Configuration parameters for the store
 * @returns Zustand store hook
 */
export const createColumnsSettingsStore = ({
	storageName,
	storageVersion,
	defaultColumns,
}: CreateColumnsSettingsStoreParams) => {
	return create<ColumnsSettingsStore>()(
		devtools(
			persist(
				(set) => ({
					columns: defaultColumns,
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
					name: storageName,
					version: storageVersion,
				}
			)
		)
	)
}
