import { useState, useCallback, useMemo, useEffect } from 'react'
import { mockTableData } from '../mock-data'
import type { TableWithPersistentSettingsItem } from '../types/filter-item'
import { useTableWithPersistentSettingsSearchParams } from './use-table-with-persistent-settings-search-params'

export const useInfinityScroll = () => {
	const { params } = useTableWithPersistentSettingsSearchParams()
	const [loadedItemsCount, setLoadedItemsCount] = useState(10)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	// Get filtered data for infinity scroll (without pagination)
	const filteredDataForInfinityScroll = useMemo(() => {
		let result = [...mockTableData]

		// Filter by search
		if (params.search) {
			const searchLower = params.search.toLowerCase()
			result = result.filter(
				(item) =>
					item.name.toLowerCase().includes(searchLower) ||
					item.id.toString().includes(searchLower) ||
					item.client_name?.toLowerCase().includes(searchLower)
			)
		}

		// Filter by status
		if (params.status && params.status !== 'all') {
			result = result.filter((item) => item.status === params.status)
		}

		// Sorting
		if (params.sort_by && params.sort_direction) {
			result = [...result].sort((a, b) => {
				const aValue = a[params.sort_by as keyof TableWithPersistentSettingsItem]
				const bValue = b[params.sort_by as keyof TableWithPersistentSettingsItem]

				if (aValue === undefined || aValue === null) return 1
				if (bValue === undefined || bValue === null) return -1

				if (typeof aValue === 'number' && typeof bValue === 'number') {
					return params.sort_direction === 'asc' ? aValue - bValue : bValue - aValue
				}

				const aStr = String(aValue)
				const bStr = String(bValue)

				if (params.sort_direction === 'asc') {
					return aStr.localeCompare(bStr, 'en')
				}
				return bStr.localeCompare(aStr, 'en')
			})
		}

		return result
	}, [params.search, params.status, params.sort_by, params.sort_direction])

	// Reset loaded items count when filters change
	useEffect(() => {
		Promise.resolve().then(() => {
			setLoadedItemsCount(10)
		})
	}, [params.search, params.status, params.sort_by, params.sort_direction])

	const handleLoadMore = useCallback(async () => {
		if (isLoadingMore) return
		
		setIsLoadingMore(true)
		
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000))
		
		setLoadedItemsCount((prev) => Math.min(prev + 10, filteredDataForInfinityScroll.length))
		setIsLoadingMore(false)
	}, [isLoadingMore, filteredDataForInfinityScroll.length])

	const hasMore = loadedItemsCount < filteredDataForInfinityScroll.length
	const infinityScrollData = useMemo(() => {
		return filteredDataForInfinityScroll.slice(0, loadedItemsCount)
	}, [filteredDataForInfinityScroll, loadedItemsCount])

	return {
		data: infinityScrollData,
		handleLoadMore,
		isLoadingMore,
		hasMore,
	}
}
