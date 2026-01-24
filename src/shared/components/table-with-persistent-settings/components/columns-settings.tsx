import { useState } from 'react'
import { GripVertical, Settings2 } from 'lucide-react'
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
import type { ColumnConfigItem, ColumnsSettingsStore } from '@/shared/store/columns-settings-store'
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

interface SortableColumnItemProps {
	id: string
	label: string
	visible: boolean
	onToggleVisible: (visible: boolean) => void
}

const SortableColumnItem = ({ id, label, visible, onToggleVisible }: SortableColumnItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id })

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
				className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
			>
				<GripVertical className="h-4 w-4" />
			</button>
			<Checkbox
				checked={visible}
				onChange={(e) => onToggleVisible(e.target.checked)}
				className="shrink-0"
			/>
			<span className="flex-1 text-sm">{label}</span>
		</div>
	)
}

interface ColumnsSettingsProps {
	columnConfigs: ColumnConfigItem[]
	columnLabels: Record<string, string>
	store: ColumnsSettingsStore
}

export const ColumnsSettings = ({ columnConfigs, columnLabels, store }: ColumnsSettingsProps) => {
	const [open, setOpen] = useState(false)
	const { setColumnOrder, setVisibleColumn } = store

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (over && active.id !== over.id) {
			const oldIndex = columnConfigs.findIndex((col) => col.id === String(active.id))
			const newIndex = columnConfigs.findIndex((col) => col.id === String(over.id))

			const reordered = arrayMove(columnConfigs, oldIndex, newIndex)
			setColumnOrder(reordered.map((col) => col.id))
		}
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
						Drag and drop to reorder columns. Toggle visibility with checkboxes.
					</SheetDescription>
				</SheetHeader>
				<div className="mt-6 space-y-2">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={columnConfigs.map((col) => col.id)}
							strategy={verticalListSortingStrategy}
						>
							{columnConfigs.map((config) => (
								<SortableColumnItem
									key={config.id}
									id={config.id}
									label={columnLabels[config.id] || config.id}
									visible={config.visible}
									onToggleVisible={(visible) =>
										setVisibleColumn({ field: config.id, visible })
									}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>
			</SheetContent>
		</Sheet>
	)
}
