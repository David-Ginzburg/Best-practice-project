import { useMemo } from 'react'
import type { SortingState } from '@tanstack/react-table'
import { useTableWithPersistentSettingsSearchParams } from './use-table-with-persistent-settings-search-params'

export const useTableWithPersistentSettingsSorting = () => {
	const { params, setListSearchParams } = useTableWithPersistentSettingsSearchParams()

	const sortingState: SortingState = useMemo(() => {
		if (params.sort_by && params.sort_direction) {
			return [
				{
					id: params.sort_by,
					desc: params.sort_direction === 'desc',
				},
			]
		}
		return []
	}, [params.sort_by, params.sort_direction])

	const handleSortChange = (field: string | undefined, direction: 'asc' | 'desc' | undefined) => {
		setListSearchParams({
			sort_by: field,
			sort_direction: direction,
		})
	}

	const onSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
		const newSorting =
			typeof updater === 'function' ? updater(sortingState) : updater

		if (newSorting.length === 0) {
			handleSortChange(undefined, undefined)
			return
		}

		const sort = newSorting[0]
		if (sort) {
			const direction = sort.desc ? 'desc' : 'asc'
			handleSortChange(sort.id, direction)
		}
	}

	return {
		sortingState,
		onSortingChange,
	}
}
