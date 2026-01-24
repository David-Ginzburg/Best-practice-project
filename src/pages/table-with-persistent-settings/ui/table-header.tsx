import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { TableHead, TableHeader, TableRow } from '@/shared/shadcn/ui/table'
import type { TableWithPersistentSettingsItem } from '../model/types/filter-item'

interface TableWithPersistentSettingsTableHeaderProps {
	table: TanStackTable<TableWithPersistentSettingsItem>
}

export const TableWithPersistentSettingsTableHeader = ({ table }: TableWithPersistentSettingsTableHeaderProps) => {
	return (
		<TableHeader>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const canSort = header.column.getCanSort()
						const isSorted = header.column.getIsSorted()

						return (
							<TableHead
								key={header.id}
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
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
									{canSort && (
										<span className="text-muted-foreground">
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
