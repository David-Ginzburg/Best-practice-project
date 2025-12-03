import { useNavigate } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/shared/shadcn/ui/button";

export const NotFoundPage = () => {
	const navigate = useNavigate();

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
				<h1 className="mb-4 text-8xl font-bold tracking-tight text-foreground">
					<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						404
					</span>
				</h1>

				{/* Title */}
				<h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
					Page Not Found
				</h2>

				{/* Description */}
				<p className="mb-8 text-lg text-muted-foreground">
					Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
				</p>

				{/* Action buttons */}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button size="lg" onClick={() => navigate("/ticket-list")} className="group">
						<Home className="mr-2 size-4" />
						Go to Home
					</Button>
					<Button size="lg" variant="outline" onClick={() => navigate(-1)}>
						Go Back
					</Button>
				</div>

				{/* Additional information */}
				<div className="mt-12 pt-8 border-t border-border">
					<p className="text-sm text-muted-foreground">
						If you believe this is an error, please contact support.
					</p>
				</div>
			</div>
		</div>
	);
};
