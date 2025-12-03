import { type ReactNode } from "react";

interface TypographyLargeProps {
	children: ReactNode;
	className?: string;
}

export const TypographyLarge = ({ children, className = "" }: TypographyLargeProps) => {
	return (
		<div className={`text-lg font-semibold ${className}`}>
			{children}
		</div>
	);
};

