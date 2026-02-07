import { ChevronDown, ChevronRight } from 'lucide-react'
import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '@/shared/shadcn/ui/table'
import { Button } from '@/shared/shadcn/ui/button'
interface TableBodyComponentProps<TData> {
	table: TanStackTable<TData>
	columnsLength: number
}

function renderRowCells<TData>(
	row: ReturnType<TanStackTable<TData>['getRowModel']>['rows'][number]
) {
	return row.getVisibleCells().map((cell) => (
		<TableCell
			key={cell.id}
			className={
				cell.getIsGrouped()
					? 'font-medium'
					: cell.getIsAggregated()
						? 'text-muted-foreground'
						: undefined
			}
		>
			{cell.getIsGrouped() ? (
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-6 w-6 shrink-0"
						onClick={row.getToggleExpandedHandler()}
						disabled={!row.getCanExpand()}
					>
						{row.getIsExpanded() ? (
							<ChevronDown className="h-4 w-4" />
						) : (
							<ChevronRight className="h-4 w-4" />
						)}
					</Button>
					{flexRender(
						cell.column.columnDef.cell,
						cell.getContext()
					)}{' '}
					<span className="text-muted-foreground font-normal">
						({row.subRows?.length ?? 0})
					</span>
				</div>
			) : cell.getIsAggregated() ? (
				flexRender(
					cell.column.columnDef.aggregatedCell ??
						cell.column.columnDef.cell,
					cell.getContext()
				)
			) : cell.getIsPlaceholder() ? null : (
				flexRender(
					cell.column.columnDef.cell,
					cell.getContext()
				)
			)}
		</TableCell>
	))
}

export const TableBodyComponent = <TData,>({
	table,
	columnsLength,
}: TableBodyComponentProps<TData>) => {
	const rows = table.getRowModel().rows

	if (!rows?.length) {
		return (
			<TableBody>
				<TableRow>
					<TableCell
						colSpan={columnsLength}
						className="h-24 text-center text-muted-foreground"
					>
						No data
					</TableCell>
				</TableRow>
			</TableBody>
		)
	}

	return (
		<TableBody>
			{rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && 'selected'}
					className={row.getIsGrouped() ? 'bg-muted/40' : undefined}
				>
					{renderRowCells(row)}
				</TableRow>
			))}
		</TableBody>
	)
}
