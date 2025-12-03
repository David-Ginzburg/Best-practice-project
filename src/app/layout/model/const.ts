import { ListTodo, Plus, FileEdit } from "lucide-react";
import { PATHS } from "@/shared/paths";

export const menuItems = [
	{
		title: "Ticket List",
		url: PATHS.ticketList,
		icon: ListTodo,
	},
	{
		title: "Create Ticket",
		url: PATHS.createTicket,
		icon: Plus,
	},
	{
		title: "Create Custom Ticket",
		url: PATHS.createCustomTicket,
		icon: FileEdit,
	},
];
