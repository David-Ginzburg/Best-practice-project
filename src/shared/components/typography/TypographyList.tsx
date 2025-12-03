import { type ReactNode } from "react";

interface TypographyListProps {
	children: ReactNode;
	className?: string;
	ordered?: boolean;
}

export const TypographyList = ({ children, className = "", ordered = false }: TypographyListProps) => {
	const ListTag = ordered ? "ol" : "ul";
	const listClassName = `my-6 ml-6 ${ordered ? "list-decimal" : "list-disc"} [&>li]:mt-2 ${className}`;

	return <ListTag className={listClassName}>{children}</ListTag>;
};

