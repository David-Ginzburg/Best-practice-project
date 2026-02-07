import type {
	ColumnDef,
	SortingState,
	VisibilityState,
	ColumnOrderState,
	GroupingState,
	ExpandedState,
	Updater,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

/** Table state persisted in Zustand; all setters accept TanStack Updater. */
export interface TableStateStore {
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
}

export interface PaginationConfig {
	totalCount: number
	onPageChange: (page: number) => void
	currentPage: number
	pageSize: number
}

export interface InfinityScrollConfig {
	onLoadMore: () => void | Promise<void>
	isLoadingMore: boolean
	hasMore: boolean
}

/**
 * Column IDs that cannot be changed by the user in Column Settings.
 * - visibility: columns that must stay visible (checkbox disabled)
 * - order: columns that cannot be reordered (drag disabled)
 * Note: columns used for grouping are always locked for visibility regardless of this config.
 * @template TColumnId - union of column ids; inferred from columns when using `as const satisfies`.
 */
export interface ColumnSettingsLock<TColumnId extends string = string> {
	visibility?: TColumnId[]
	order?: TColumnId[]
}

/** Extracts column id from a column def (accessorKey or id). */
type ColumnIdFromDef<C> = C extends { accessorKey: infer K }
	? K extends string
		? K
		: never
	: C extends { id: infer I }
		? I extends string
			? I
			: never
		: never

/** Union of column ids from a readonly columns array (use columns `as const satisfies` for literal inference). */
export type ColumnIdsFromColumns<T> =
	T extends readonly (infer C)[] ? ColumnIdFromDef<C> : never

type TableWithPersistentSettingsConfigBase<
	TData,
	TColumns extends readonly ColumnDef<TData>[],
> = {
	data: TData[]
	columns: TColumns
	tableStore: TableStateStore
	/** Optional: lock visibility and/or order (only column ids from your columns config) */
	columnLock?: ColumnSettingsLock<ColumnIdsFromColumns<TColumns>>
	isLoading?: boolean
	filtersSlot?: ReactNode
}

/** Either pagination or infinity scroll, not both. */
export type TableWithPersistentSettingsConfig<
	TData,
	TColumns extends readonly ColumnDef<TData>[] = ColumnDef<TData>[],
> = TableWithPersistentSettingsConfigBase<TData, TColumns> &
		(
			| {
					paginationConfig: PaginationConfig
					infinityScrollConfig?: never
				}
			| {
					paginationConfig?: never
					infinityScrollConfig: InfinityScrollConfig
				}
		)
