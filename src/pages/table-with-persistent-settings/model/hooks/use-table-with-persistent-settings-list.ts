import { useMemo, useState, useEffect } from 'react'
import { mockTableData } from '../mock-data'
import type { TableWithPersistentSettingsItem } from '../types/filter-item'
import { useTableWithPersistentSettingsSearchParams } from './use-table-with-persistent-settings-search-params'

export const useTableWithPersistentSettingsList = () => {
	const { params } = useTableWithPersistentSettingsSearchParams()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		// Set loading to true asynchronously to avoid React Compiler warning
		Promise.resolve().then(() => {
			setIsLoading(true)
		})

		return () => clearTimeout(timer)
	}, [params])
	
	const filteredData = useMemo(() => {
		let result = [...mockTableData]

		// Filter by search for demo purposes, backend will handle it
		if (params.search) {
			const searchLower = params.search.toLowerCase()
			result = result.filter(
				(item) =>
					item.name.toLowerCase().includes(searchLower) ||
					item.id.toString().includes(searchLower) ||
					item.client_name?.toLowerCase().includes(searchLower)
			)
		}

		// Filter by status for demo purposes, backend will handle it
		if (params.status && params.status !== 'all') {
			result = result.filter((item) => item.status === params.status)
		}

		// Sorting for demo purposes, backend will handle it
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
	}, [params.search, params.status, params.sort_direction, params.sort_by])

	// Pagination for demo purposes, backend will handle it
	const paginatedData = useMemo(() => {
		const startIndex = (params.page - 1) * params.page_size
		const endIndex = startIndex + params.page_size
		return filteredData.slice(startIndex, endIndex)
	}, [filteredData, params.page, params.page_size])

	return {
		data: paginatedData,
		totalCount: mockTableData.length,
		filteredCount: filteredData.length,
		isLoading,
	}
}
