import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '@/shared/shadcn/ui/table'

interface TableBodyComponentProps<TData> {
	table: TanStackTable<TData>
	columnsLength: number
}

export const TableBodyComponent = <TData,>({ table, columnsLength }: TableBodyComponentProps<TData>) => {
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
