import { type ColumnDef } from "@tanstack/react-table";
import type { Ticket } from "@/entities/ticket";
import {
	getStatusColor,
	getStatusLabel,
	getPriorityColor,
	getPriorityLabel,
} from "@/entities/ticket";

export const ticketColumns: ColumnDef<Ticket>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => <div className="font-mono">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => <div>{row.getValue("title")}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as Ticket["status"];
			return <span className={getStatusColor(status)}>{getStatusLabel(status)}</span>;
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as Ticket["priority"];
			return <span className={getPriorityColor(priority)}>{getPriorityLabel(priority)}</span>;
		},
	},
	{
		accessorKey: "assignee",
		header: "Assignee",
		cell: ({ row }) => <div>{row.getValue("assignee")}</div>,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
	},
];

