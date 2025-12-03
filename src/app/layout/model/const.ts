import { ListTodo, Plus } from "lucide-react";
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
];
