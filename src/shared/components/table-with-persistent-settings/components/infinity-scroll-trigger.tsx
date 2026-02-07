import { useEffect, useRef } from 'react'
import { Button } from '@/shared/shadcn/ui/button'

interface InfinityScrollTriggerProps {
	onLoadMore: () => void | Promise<void>
	isLoadingMore?: boolean
	hasMore?: boolean
	/** When set (e.g. table scroll container), observer uses this as root so scrolling inside the container triggers load */
	scrollContainerRef?: React.RefObject<HTMLDivElement | null>
	/**
	 * When true, auto-load on scroll is disabled; only a "Load more" button is shown.
	 * Use when grouping is active to avoid loading until the viewport is filled (which can cause a request loop).
	 */
	manualOnly?: boolean
}

export const InfinityScrollTrigger = ({
	onLoadMore,
	isLoadingMore = false,
	hasMore = true,
	scrollContainerRef,
	manualOnly = false,
}: InfinityScrollTriggerProps) => {
	const triggerRef = useRef<HTMLDivElement>(null)
	const onLoadMoreRef = useRef(onLoadMore)
	const wasIntersectingRef = useRef(false)

	useEffect(() => {
		onLoadMoreRef.current = onLoadMore
	}, [onLoadMore])

	useEffect(() => {
		if (manualOnly || !hasMore || isLoadingMore) return
		const root = scrollContainerRef?.current ?? null

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries
				if (!entry) return
				const isIntersecting = entry.isIntersecting
				if (isIntersecting && !wasIntersectingRef.current) {
					wasIntersectingRef.current = true
					onLoadMoreRef.current()
				}
				if (!isIntersecting) {
					wasIntersectingRef.current = false
				}
			},
			{
				root,
				rootMargin: '100px',
				threshold: 0.1,
			}
		)

		const currentRef = triggerRef.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [manualOnly, isLoadingMore, hasMore, scrollContainerRef])

	if (!hasMore) {
		return null
	}

	return (
		<div ref={triggerRef} className="flex flex-col items-center gap-2 py-4">
			{isLoadingMore ? (
				<div className="text-sm text-muted-foreground">Loading more...</div>
			) : manualOnly ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => onLoadMore()}
				>
					Load more
				</Button>
			) : null}
		</div>
	)
}
