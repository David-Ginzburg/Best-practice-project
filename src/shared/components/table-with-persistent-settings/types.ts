import { type ColumnDef, type SortingState } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import type { ColumnsSettingsStore } from '@/shared/store/columns-settings-store'

export interface StoreConfig {
	storageName: string
	storageVersion: number
}

export interface SortConfig {
	sortingState: SortingState
	onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void
}

export interface PaginationConfig {
	totalCount: number
	onPageChange: (page: number) => void
	currentPage: number
	pageSize: number
}

export interface InfinityScrollConfig {
	onLoadMore: () => void | Promise<void>
	isLoadingMore?: boolean
	hasMore?: boolean
}

type TableWithPersistentSettingsConfigBase<TData> = {
	// Data and columns
	data: TData[]
	columns: ColumnDef<TData>[]
	
	// Sorting
	sortConfig?: SortConfig
	
	// Pagination or Infinity Scroll (mutually exclusive)
	paginationConfig?: PaginationConfig
	infinityScrollConfig?: InfinityScrollConfig
	
	// UI
	isLoading?: boolean
	
	// Slots
	filtersSlot?: ReactNode
}

type TableWithPersistentSettingsConfigWithStore<TData> = TableWithPersistentSettingsConfigBase<TData> & {
	store: ColumnsSettingsStore
	storeConfig?: never
}

type TableWithPersistentSettingsConfigWithStoreConfig<TData> = TableWithPersistentSettingsConfigBase<TData> & {
	store?: never
	storeConfig: StoreConfig
}

export type TableWithPersistentSettingsConfig<TData> = 
	| TableWithPersistentSettingsConfigWithStore<TData>
	| TableWithPersistentSettingsConfigWithStoreConfig<TData>
