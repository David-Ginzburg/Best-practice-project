import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
	VisibilityState,
	ColumnOrderState,
	SortingState,
	GroupingState,
	ExpandedState,
	Updater,
} from '@tanstack/react-table'
import { functionalUpdate } from '@/shared/components/table-with-persistent-settings/utils/functional-update'
import {
	TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_NAME,
	TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_VERSION,
} from '../const/columns'

export interface TableSettingsStore {
	columnVisibility: VisibilityState
	columnOrder: ColumnOrderState
	sorting: SortingState
	grouping: GroupingState
	expanded: ExpandedState

	setColumnVisibility: (updater: Updater<VisibilityState>) => void
	setColumnOrder: (updater: Updater<ColumnOrderState>) => void
	setSorting: (updater: Updater<SortingState>) => void
	setGrouping: (updater: Updater<GroupingState>) => void
	setExpanded: (updater: Updater<ExpandedState>) => void

	reset: () => void
}

const initialState = {
	columnVisibility: {} as VisibilityState,
	columnOrder: [] as ColumnOrderState,
	sorting: [] as SortingState,
	grouping: [] as GroupingState,
	expanded: {} as ExpandedState,
}

export const useTableSettingsStore = create<TableSettingsStore>()(
	persist(
		(set) => ({
			...initialState,

			setColumnVisibility: (updater) =>
				set((state) => ({
					columnVisibility: functionalUpdate(updater, state.columnVisibility),
				})),

			setColumnOrder: (updater) =>
				set((state) => ({
					columnOrder: functionalUpdate(updater, state.columnOrder),
				})),

			setSorting: (updater) =>
				set((state) => ({
					sorting: functionalUpdate(updater, state.sorting),
				})),

			setGrouping: (updater) =>
				set((state) => ({
					grouping: functionalUpdate(updater, state.grouping),
				})),

			setExpanded: (updater) =>
				set((state) => ({
					expanded: functionalUpdate(updater, state.expanded),
				})),

			reset: () => set(initialState),
		}),
		{
			name: TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_NAME,
			version: TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_VERSION,
			storage: createJSONStorage(() => localStorage),
		}
	)
)
