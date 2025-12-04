import { CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SuccessMessageProps {
	message?: string;
	className?: string;
}

/**
 * Success message component with icon
 * Displays a visually appealing success notification
 */
export const SuccessMessage = ({
	message = "Success! Your request has been processed.",
	className,
}: SuccessMessageProps) => {
	return (
		<div
			className={cn(
				"flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
				className
			)}
			role="alert"
			aria-live="polite"
		>
			<CheckCircle2 className="size-5 shrink-0 text-green-600 dark:text-green-400" />
			<p className="text-sm font-medium">{message}</p>
		</div>
	);
};

