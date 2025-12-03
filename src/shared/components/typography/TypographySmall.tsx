import { type ReactNode } from "react";

interface TypographySmallProps {
	children: ReactNode;
	className?: string;
}

export const TypographySmall = ({ children, className = "" }: TypographySmallProps) => {
	return (
		<small className={`text-sm leading-none font-medium ${className}`}>
			{children}
		</small>
	);
};

