import { type ReactNode } from "react";

interface TypographyInlineCodeProps {
	children: ReactNode;
	className?: string;
}

export const TypographyInlineCode = ({ children, className = "" }: TypographyInlineCodeProps) => {
	return (
		<code className={`bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}>
			{children}
		</code>
	);
};

