import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

/**
 * Hook that wraps useNavigate with View Transition API support
 * Animations apply only to page-content, not root, to keep Sidebar static
 */
export const useTransitionNavigate = () => {
	const navigate = useNavigate();

	const transitionNavigate = useCallback(
		(to: string | number) => {
			// Check if View Transitions API is supported
			if (!document.startViewTransition) {
				if (typeof to === "number") {
					navigate(to);
				} else {
					navigate(to);
				}
				return;
			}

			// Create transition for page-content only (not root)
			document.startViewTransition(() => {
				if (typeof to === "number") {
					navigate(to);
				} else {
					navigate(to);
				}
			});
		},
		[navigate]
	);

	return transitionNavigate;
};
