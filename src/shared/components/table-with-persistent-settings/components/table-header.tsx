import { Layers } from 'lucide-react'
import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { TableHead, TableHeader, TableRow } from '@/shared/shadcn/ui/table'
import { Button } from '@/shared/shadcn/ui/button'

interface TableHeaderComponentProps<TData> {
	table: TanStackTable<TData>
	/** When true (e.g. with virtual scroll), header stays visible while scrolling */
	stickyHeader?: boolean
}

export const TableHeaderComponent = <TData,>({
	table,
	stickyHeader = false,
}: TableHeaderComponentProps<TData>) => {
	return (
		<TableHeader
			className={stickyHeader ? 'sticky top-0 z-10 bg-background shadow-sm' : undefined}
		>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const canSort = header.column.getCanSort()
						const isSorted = header.column.getIsSorted()
						const canGroup = header.column.getCanGroup()
						const isGrouped = header.column.getIsGrouped()

						return (
							<TableHead
								key={header.id}
								colSpan={header.colSpan}
								className={canSort ? 'cursor-pointer select-none' : ''}
								onClick={() => {
									if (canSort) {
										header.column.toggleSorting(
											header.column.getIsSorted() === 'asc'
										)
									}
								}}
							>
								<div className="flex items-center gap-2">
									{canGroup && (
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-7 w-7 shrink-0"
											title={isGrouped ? 'Remove grouping' : 'Group by this column'}
											onClick={(e) => {
												e.stopPropagation()
												header.column.getToggleGroupingHandler()?.()
											}}
										>
											<Layers
												className={`h-4 w-4 ${isGrouped ? 'text-primary' : 'text-muted-foreground'}`}
											/>
										</Button>
									)}
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
									{canSort && (
										<span className="text-muted-foreground shrink-0">
											{isSorted === 'asc' ? '↑' : isSorted === 'desc' ? '↓' : '⇅'}
										</span>
									)}
								</div>
							</TableHead>
						)
					})}
				</TableRow>
			))}
		</TableHeader>
	)
}
