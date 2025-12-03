import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Hook for managing theme state
 * Supports system preference detection and localStorage persistence
 */
export const useTheme = () => {
	const [theme, setThemeState] = useState<Theme>(() => {
		// Check localStorage first
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "light" || stored === "dark") {
			return stored;
		}
		// Check system preference
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		return "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return { theme, setTheme, toggleTheme };
};
