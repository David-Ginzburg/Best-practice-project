import { useQuery } from "@tanstack/react-query";
import { getTickets } from "./mock-data";

/**
 * React Query hook for fetching tickets list
 */
export const useTicketListQuery = () => {
	return useQuery({
		queryKey: ["tickets"],
		queryFn: getTickets,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
