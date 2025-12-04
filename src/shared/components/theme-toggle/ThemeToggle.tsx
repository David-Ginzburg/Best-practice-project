import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/hooks/use-theme";
import { Button } from "@/shared/shadcn/ui/button";
import { cn } from "@/shared/lib/utils";

interface ThemeToggleProps {
	className?: string;
}

/**
 * Theme toggle button with expanding circle animation
 * Uses View Transitions API for smooth theme switching
 */
export const ThemeToggle = ({ className }: ThemeToggleProps) => {
	const { toggleTheme } = useTheme();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Get click position relative to viewport
		const x = e.clientX;
		const y = e.clientY;

		// Calculate the farthest corner distance for circle radius
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);

		// Check if View Transitions API is supported
		if (!document.startViewTransition) {
			toggleTheme();
			return;
		}

		// Temporarily disable view-transition-name for elements that should not animate during theme change
		const ticketTable = document.querySelector(
			'[style*="view-transition-name: ticket-table"]'
		) as HTMLElement;
		const ticketTableOriginalName = ticketTable?.style.viewTransitionName;
		if (ticketTable && ticketTableOriginalName === "ticket-table") {
			ticketTable.style.viewTransitionName = "none";
		}

		// Temporarily disable view-transition-name for page-content to prevent page transition conflicts
		const pageContent = document.querySelector(
			'[style*="view-transition-name: page-content"]'
		) as HTMLElement;
		const pageContentOriginalName = pageContent?.style.viewTransitionName;
		if (pageContent && pageContentOriginalName === "page-content") {
			pageContent.style.viewTransitionName = "none";
		}

		// Create a transition with custom animation
		const transition = document.startViewTransition(() => {
			toggleTheme();
		});

		// Wait for the transition to be ready, then animate
		transition.ready.then(() => {
			// Animate both old and new views for better visibility
			// Old view: shrink circle from full to 0px
			document.documentElement.animate(
				{
					clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
				},
				{
					duration: 800,
					easing: "cubic-bezier(0.4, 0, 0.2, 1)",
					pseudoElement: "::view-transition-old(root)",
				}
			);

			// New view: expand circle from 0px to full
			document.documentElement.animate(
				{
					clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
				},
				{
					duration: 800,
					easing: "cubic-bezier(0.4, 0, 0.2, 1)",
					pseudoElement: "::view-transition-new(root)",
				}
			);
		});

		// Clean up after transition completes
		transition.finished.finally(() => {
			// Restore view-transition-name after transition completes
			if (ticketTable && ticketTableOriginalName === "ticket-table") {
				ticketTable.style.viewTransitionName = ticketTableOriginalName;
			}
			if (pageContent && pageContentOriginalName === "page-content") {
				pageContent.style.viewTransitionName = pageContentOriginalName;
			}
		});
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={handleClick}
			className={cn("relative", className)}
			aria-label="Toggle theme"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};
