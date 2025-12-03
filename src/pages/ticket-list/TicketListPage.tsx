import { TicketList } from "./ui";
import { TypographyH1 } from "@/shared/components/typography";

export const TicketListPage = () => {
	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Ticket List</TypographyH1>
			<TicketList />
		</div>
	);
};
