import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/shadcn/ui/table";
import type { Ticket } from "@/entities/ticket";
import {
	getStatusColor,
	getStatusLabel,
	getPriorityColor,
	getPriorityLabel,
} from "@/entities/ticket";

interface TicketTableProps {
	tickets: Ticket[];
}

export const TicketTable = ({ tickets }: TicketTableProps) => {
	if (tickets.length === 0) {
		return (
			<div className="mb-6">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Assignee</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
								No tickets found
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		);
	}

	return (
		<div className="mb-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Priority</TableHead>
						<TableHead>Assignee</TableHead>
						<TableHead>Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tickets.map((ticket) => (
						<TableRow key={ticket.id}>
							<TableCell className="font-mono">{ticket.id}</TableCell>
							<TableCell>{ticket.title}</TableCell>
							<TableCell>
								<span className={getStatusColor(ticket.status)}>
									{getStatusLabel(ticket.status)}
								</span>
							</TableCell>
							<TableCell>
								<span className={getPriorityColor(ticket.priority)}>
									{getPriorityLabel(ticket.priority)}
								</span>
							</TableCell>
							<TableCell>{ticket.assignee}</TableCell>
							<TableCell>{ticket.createdAt}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

