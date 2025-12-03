import { type ReactNode } from "react";

interface TypographyMutedProps {
	children: ReactNode;
	className?: string;
}

export const TypographyMuted = ({ children, className = "" }: TypographyMutedProps) => {
	return (
		<p className={`text-muted-foreground text-sm ${className}`}>
			{children}
		</p>
	);
};

