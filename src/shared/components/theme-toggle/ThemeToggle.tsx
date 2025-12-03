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

		// Temporarily disable view-transition-name for all elements except root
		const elements = document.querySelectorAll("[style*='view-transition-name']");
		const savedNames: Map<HTMLElement, string> = new Map();

		elements.forEach((el) => {
			const htmlEl = el as HTMLElement;
			const currentName = htmlEl.style.viewTransitionName;
			if (currentName && currentName !== "none" && currentName !== "root") {
				savedNames.set(htmlEl, currentName);
				htmlEl.style.viewTransitionName = "none";
			}
		});

		// Set CSS variables for animation
		document.documentElement.style.setProperty("--theme-transition-x", `${x}px`);
		document.documentElement.style.setProperty("--theme-transition-y", `${y}px`);
		document.documentElement.style.setProperty("--theme-transition-radius", `${endRadius}px`);

		// Create a transition with custom animation
		const transition = document.startViewTransition(() => {
			toggleTheme();
		});

		// Restore view-transition-name after transition completes
		transition.finished.finally(() => {
			savedNames.forEach((name, el) => {
				el.style.viewTransitionName = name;
			});
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
