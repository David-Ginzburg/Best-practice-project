import { type ReactNode } from "react";

interface TypographyLeadProps {
	children: ReactNode;
	className?: string;
}

export const TypographyLead = ({ children, className = "" }: TypographyLeadProps) => {
	return (
		<p className={`text-muted-foreground text-xl ${className}`}>
			{children}
		</p>
	);
};

