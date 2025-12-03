interface TicketListInfoProps {
	shownCount: number;
	filteredCount: number;
	totalCount: number;
}

export const TicketListInfo = ({
	shownCount,
	filteredCount,
	totalCount,
}: TicketListInfoProps) => {
	return (
		<div className="mt-4 text-sm text-muted-foreground text-center">
			Showing {shownCount} of {filteredCount} tickets
			{filteredCount !== totalCount && ` (total ${totalCount})`}
		</div>
	);
};

