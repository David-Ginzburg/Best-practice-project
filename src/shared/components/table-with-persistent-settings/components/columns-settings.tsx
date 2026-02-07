import { useState, useMemo, type ChangeEvent } from 'react'
import { GripVertical, Settings2 } from 'lucide-react'
import type { Table } from '@tanstack/react-table'
import type { Updater } from '@tanstack/react-table'
import type { ColumnOrderState } from '@tanstack/react-table'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/shadcn/ui/sheet'
import { Checkbox } from '@/shared/shadcn/ui/checkbox'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ColumnSettingsLock } from '../types'

interface SortableColumnItemProps {
	id: string
	label: string
	visible: boolean
	grouped: boolean
	visibilityLocked: boolean
	orderLocked: boolean
	onToggleVisible: (visible: boolean) => void
}

const SortableColumnItem = ({
	id,
	label,
	visible,
	grouped,
	visibilityLocked,
	orderLocked,
	onToggleVisible,
}: SortableColumnItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, disabled: orderLocked })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-3 rounded-md border p-3 bg-background"
		>
			<button
				{...attributes}
				{...listeners}
				className={
					orderLocked
						? 'cursor-default text-muted-foreground/50'
						: 'cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground'
				}
				title={orderLocked ? 'Column order is locked' : undefined}
				aria-disabled={orderLocked}
			>
				<GripVertical className="h-4 w-4" />
			</button>
			<Checkbox
				checked={visible}
				disabled={visibilityLocked}
				onChange={(e) => !visibilityLocked && onToggleVisible(e.target.checked)}
				className="shrink-0"
				title={
					visibilityLocked
						? grouped
							? 'Column is used for grouping and cannot be hidden'
							: 'Column visibility is locked'
						: undefined
				}
			/>
			<span className="flex-1 text-sm">{label}</span>
			{grouped && (
				<span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
					Grouped
				</span>
			)}
			{orderLocked && !grouped && (
				<span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
					Fixed
				</span>
			)}
		</div>
	)
}

interface ColumnItem {
	id: string
	label: string
	visible: boolean
	grouped: boolean
	visibilityLocked: boolean
	orderLocked: boolean
}

interface ColumnsSettingsProps<TData> {
	table: Table<TData>
	columnLabels: Record<string, string>
	setColumnOrder: (updater: Updater<ColumnOrderState>) => void
	columnLock?: ColumnSettingsLock
}

export const ColumnsSettings = <TData,>({
	table,
	columnLabels,
	setColumnOrder,
	columnLock,
}: ColumnsSettingsProps<TData>) => {
	const [open, setOpen] = useState(false)

	const columnVisibility = table.getState().columnVisibility
	const columnOrder = table.getState().columnOrder
	const grouping = table.getState().grouping
	const groupedColumnIds = useMemo(() => new Set(grouping), [grouping])
	const visibilityLockedIds = useMemo(
		() => new Set(columnLock?.visibility ?? []),
		[columnLock?.visibility]
	)
	const orderLockedIds = useMemo(
		() => new Set(columnLock?.order ?? []),
		[columnLock?.order]
	)

	const columnsList = useMemo(() => {
		const all = table.getAllLeafColumns()
		const groupedSet = new Set(grouping)
		const groupedCols = grouping
			.map((id) => all.find((c) => c.id === id))
			.filter(Boolean) as typeof all
		const restOrder = columnOrder.filter((id) => !groupedSet.has(id))
		const restCols = restOrder
			.map((id) => all.find((c) => c.id === id))
			.filter(Boolean) as typeof all
		const restMissing = all.filter(
			(c) => !groupedSet.has(c.id) && !restOrder.includes(c.id)
		)
		return [...groupedCols, ...restCols, ...restMissing]
	}, [table, columnOrder, grouping])

	const columnItems: ColumnItem[] = useMemo(
		() =>
			columnsList.map((col) => ({
				id: col.id,
				label: columnLabels[col.id] ?? col.id,
				visible: columnVisibility[col.id] !== false,
				grouped: groupedColumnIds.has(col.id),
				visibilityLocked:
					groupedColumnIds.has(col.id) || visibilityLockedIds.has(col.id),
				orderLocked:
					orderLockedIds.has(col.id) || groupedColumnIds.has(col.id),
			})),
		[
			columnsList,
			columnLabels,
			columnVisibility,
			groupedColumnIds,
			visibilityLockedIds,
			orderLockedIds,
		]
	)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = columnItems.findIndex((c) => c.id === String(active.id))
		const newIndex = columnItems.findIndex((c) => c.id === String(over.id))
		if (oldIndex === -1 || newIndex === -1) return
		if (columnItems[oldIndex]?.orderLocked || columnItems[newIndex]?.orderLocked) return

		const reordered = arrayMove(columnItems, oldIndex, newIndex)
		setColumnOrder(reordered.map((c) => c.id))
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<Settings2 className="h-4 w-4" />
					Columns
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Column Settings</SheetTitle>
					<SheetDescription>
						Drag and drop to reorder columns. Toggle visibility with
						checkboxes.
					</SheetDescription>
				</SheetHeader>
				<div className="mt-6 space-y-2">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={columnItems.map((c) => c.id)}
							strategy={verticalListSortingStrategy}
						>
							{columnItems.map((item) => (
								<SortableColumnItem
									key={item.id}
									id={item.id}
									label={item.label}
									visible={item.visible}
									grouped={item.grouped}
									visibilityLocked={item.visibilityLocked}
									orderLocked={item.orderLocked}
									onToggleVisible={(visible) => {
										if (item.visibilityLocked) return
										const handler = table.getColumn(item.id)?.getToggleVisibilityHandler()
										if (handler) {
											handler({ target: { checked: visible } } as ChangeEvent<HTMLInputElement>)
										}
									}}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>
			</SheetContent>
		</Sheet>
	)
}
