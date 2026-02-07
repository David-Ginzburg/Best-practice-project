import type { Updater } from '@tanstack/react-table'

/**
 * Resolves TanStack Table updater: if it's a function, calls it with previous state; otherwise returns the value.
 */
export const functionalUpdate = <T>(updater: Updater<T>, previous: T): T => {
	if (typeof updater === 'function') {
		return (updater as (prev: T) => T)(previous)
	}
	return updater
}
