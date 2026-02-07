import { useEffect, useRef, useMemo } from 'react'
import { useTableSettingsStore } from '../store/table-settings-store'
import { useTableWithPersistentSettingsSearchParams } from './use-table-with-persistent-settings-search-params'

/**
 * Returns table store with setSorting wrapped to sync to URL synchronously (no subscription).
 * On first load, hydrates store from URL once when sort params are present (shared links).
 */
export const useTableSettingsSyncUrl = () => {
	const { params, setListSearchParams } = useTableWithPersistentSettingsSearchParams()
	const store = useTableSettingsStore()
	const hasHydratedFromUrl = useRef(false)

	// One-time: hydrate store from URL when opening a shared link
	useEffect(() => {
		if (hasHydratedFromUrl.current) return
		if (params.sort_by && params.sort_direction) {
			hasHydratedFromUrl.current = true
			store.setSorting([
				{ id: params.sort_by, desc: params.sort_direction === 'desc' },
			])
		}
	}, [params.sort_by, params.sort_direction, store])

	const tableStore = useMemo(() => {
		const setSortingWithUrl = (updater: Parameters<typeof store.setSorting>[0]) => {
			store.setSorting(updater)
			const sorting = useTableSettingsStore.getState().sorting
			if (sorting.length === 0) {
				setListSearchParams({ sort_by: undefined, sort_direction: undefined })
			} else {
				const first = sorting[0]
				if (first) {
					setListSearchParams({
						sort_by: first.id,
						sort_direction: first.desc ? 'desc' : 'asc',
					})
				}
			}
		}
		return {
			...store,
			setSorting: setSortingWithUrl,
		}
	}, [store, setListSearchParams])

	return tableStore
}
