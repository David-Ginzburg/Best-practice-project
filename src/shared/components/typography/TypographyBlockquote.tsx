import { type ReactNode } from "react";

interface TypographyBlockquoteProps {
	children: ReactNode;
	className?: string;
}

export const TypographyBlockquote = ({ children, className = "" }: TypographyBlockquoteProps) => {
	return (
		<blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
			{children}
		</blockquote>
	);
};

