import { TicketList } from "@/widgets/ticket-list";

export const TicketListPage = () => {
	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6">Ticket List</h1>
			<TicketList />
		</div>
	);
};
