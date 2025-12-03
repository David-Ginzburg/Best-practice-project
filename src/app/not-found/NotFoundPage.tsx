import { Home, SearchX } from "lucide-react";
import { Button } from "@/shared/shadcn/ui/button";
import { PATHS } from "@/shared/paths";
import { useTransitionNavigate } from "@/shared/hooks/use-transition-navigate";
import { TypographyH1, TypographyH2, TypographyLead, TypographyMuted } from "@/shared/components/typography";

export const NotFoundPage = () => {
	const navigate = useTransitionNavigate();

	return (
		<div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
			<div className="mx-auto max-w-md text-center">
				{/* Animated icon */}
				<div className="mb-8 flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-xl" />
						<div className="relative rounded-full bg-muted p-6">
							<SearchX className="size-16 text-muted-foreground" />
						</div>
					</div>
				</div>

				{/* Large 404 number */}
				<TypographyH1 className="mb-4 text-8xl">
					<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						404
					</span>
				</TypographyH1>

				{/* Title */}
				<TypographyH2 className="mb-3 border-none pb-0">
					Page Not Found
				</TypographyH2>

				{/* Description */}
				<TypographyLead className="mb-8">
					Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
				</TypographyLead>

				{/* Action buttons */}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button size="lg" onClick={() => navigate(PATHS.ticketList, "forward")} className="group">
						<Home className="mr-2 size-4" />
						Go to Home
					</Button>
					<Button size="lg" variant="outline" onClick={() => navigate(-1, "backward")}>
						Go Back
					</Button>
				</div>

				{/* Additional information */}
				<div className="mt-12 pt-8 border-t border-border">
					<TypographyMuted>
						If you believe this is an error, please contact support.
					</TypographyMuted>
				</div>
			</div>
		</div>
	);
};
