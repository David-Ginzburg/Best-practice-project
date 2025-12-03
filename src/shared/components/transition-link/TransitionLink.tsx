import { Link, type LinkProps, useNavigate } from "react-router-dom";
import { startViewTransition } from "@/shared/lib/view-transition";
import { useCallback } from "react";

interface TransitionLinkProps extends LinkProps {
	children: React.ReactNode;
}

/**
 * Link component with View Transition API support
 * Wraps React Router's Link to enable smooth page transitions
 */
export const TransitionLink = ({ to, onClick, ...props }: TransitionLinkProps) => {
	const navigate = useNavigate();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			// Prevent default navigation to handle it with View Transition
			e.preventDefault();

			const targetPath = typeof to === "string" ? to : to.pathname || "";

			startViewTransition(() => {
				// Call original onClick if provided
				if (onClick) {
					onClick(e);
				}
				// Navigate using React Router
				navigate(targetPath);
			}, "forward");
		},
		[to, onClick, navigate]
	);

	return <Link to={to} onClick={handleClick} {...props} />;
};
