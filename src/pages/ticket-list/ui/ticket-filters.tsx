import { Field, FieldContent, FieldLabel } from "@/shared/shadcn/ui/field";
import { Input } from "@/shared/shadcn/ui/input";
import type { TicketStatus, TicketPriority } from "@/entities/ticket";

interface TicketFiltersProps {
	searchQuery: string;
	statusFilter: TicketStatus | "all";
	priorityFilter: TicketPriority | "all";
	onSearchChange: (value: string) => void;
	onStatusChange: (value: TicketStatus | "all") => void;
	onPriorityChange: (value: TicketPriority | "all") => void;
}

export const TicketFilters = ({
	searchQuery,
	statusFilter,
	priorityFilter,
	onSearchChange,
	onStatusChange,
	onPriorityChange,
}: TicketFiltersProps) => {
	return (
		<div className="mb-6 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Field>
					<FieldLabel>Search</FieldLabel>
					<FieldContent>
						<Input
							type="text"
							placeholder="Search by title or ID..."
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</FieldContent>
				</Field>

				<Field>
					<FieldLabel>Status</FieldLabel>
					<FieldContent>
						<select
							className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							value={statusFilter}
							onChange={(e) => onStatusChange(e.target.value as TicketStatus | "all")}
						>
							<option value="all">All statuses</option>
							<option value="open">Open</option>
							<option value="in_progress">In Progress</option>
							<option value="resolved">Resolved</option>
							<option value="closed">Closed</option>
						</select>
					</FieldContent>
				</Field>

				<Field>
					<FieldLabel>Priority</FieldLabel>
					<FieldContent>
						<select
							className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							value={priorityFilter}
							onChange={(e) => onPriorityChange(e.target.value as TicketPriority | "all")}
						>
							<option value="all">All priorities</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
							<option value="urgent">Urgent</option>
						</select>
					</FieldContent>
				</Field>
			</div>
		</div>
	);
};
