import { Link, type LinkProps, useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

interface TransitionLinkProps extends LinkProps {
	children: React.ReactNode;
}

/**
 * Link component with View Transition API support
 * Wraps React Router's Link to enable smooth page transitions
 * Animations apply only to page-content, not root, to keep Sidebar static
 */
export const TransitionLink = ({ to, onClick, ...props }: TransitionLinkProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			// Prevent default navigation to handle it with View Transition
			e.preventDefault();

			const targetPath = typeof to === "string" ? to : to.pathname || "";

			// Check if we're already on the target page
			if (location.pathname === targetPath) {
				// If already on the same page, just call onClick if provided and return
				if (onClick) {
					onClick(e);
				}
				return;
			}

			// Check if View Transitions API is supported
			if (!document.startViewTransition) {
				// Fallback without transition
				if (onClick) {
					onClick(e);
				}
				navigate(targetPath);
				return;
			}

			// Create transition for page-content only (not root)
			document.startViewTransition(() => {
				// Call original onClick if provided
				if (onClick) {
					onClick(e);
				}
				// Navigate using React Router
				navigate(targetPath);
			});
		},
		[to, onClick, navigate, location.pathname]
	);

	return <Link to={to} onClick={handleClick} {...props} />;
};
