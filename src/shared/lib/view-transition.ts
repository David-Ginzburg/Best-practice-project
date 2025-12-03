/**
 * Utility function to wrap state updates with View Transition API
 * Provides smooth transitions between page states
 * @param callback - Function to execute during transition
 * @param direction - Direction of transition: 'forward' (right) or 'backward' (left)
 */
export const startViewTransition = (
	callback: () => void | Promise<void>,
	direction: "forward" | "backward" = "forward"
) => {
	if (!document.startViewTransition) {
		// Fallback for browsers that don't support View Transitions
		callback();
		return;
	}

	// Set CSS variable for transition direction
	document.documentElement.style.setProperty("--transition-direction", direction === "forward" ? "1" : "-1");

	document.startViewTransition(() => {
		return callback();
	});
};

