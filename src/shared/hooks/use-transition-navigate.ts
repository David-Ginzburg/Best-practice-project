import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { startViewTransition } from "@/shared/lib/view-transition";

/**
 * Hook that wraps useNavigate with View Transition API support
 * Provides smooth page transitions when navigating programmatically
 */
export const useTransitionNavigate = () => {
	const navigate = useNavigate();

	const transitionNavigate = useCallback(
		(to: string | number, direction: "forward" | "backward" = "forward") => {
			startViewTransition(() => {
				if (typeof to === "number") {
					navigate(to);
				} else {
					navigate(to);
				}
			}, direction);
		},
		[navigate]
	);

	return transitionNavigate;
};

