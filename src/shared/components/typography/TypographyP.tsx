import { type ReactNode } from "react";

interface TypographyPProps {
	children: ReactNode;
	className?: string;
}

export const TypographyP = ({ children, className = "" }: TypographyPProps) => {
	return (
		<p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
			{children}
		</p>
	);
};

