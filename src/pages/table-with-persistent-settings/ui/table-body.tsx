import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '@/shared/shadcn/ui/table'
import type { TableWithPersistentSettingsItem } from '../model/types/filter-item'

interface TableWithPersistentSettingsTableBodyProps {
	table: TanStackTable<TableWithPersistentSettingsItem>
	columnsLength: number
}

export const TableWithPersistentSettingsTableBody = ({ table, columnsLength }: TableWithPersistentSettingsTableBodyProps) => {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						colSpan={columnsLength}
						className="h-24 text-center text-muted-foreground"
					>
						No data
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
