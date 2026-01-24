import { useEffect, useRef } from 'react'

interface InfinityScrollTriggerProps {
	onLoadMore: () => void | Promise<void>
	isLoadingMore?: boolean
	hasMore?: boolean
}

export const InfinityScrollTrigger = ({
	onLoadMore,
	isLoadingMore = false,
	hasMore = true,
}: InfinityScrollTriggerProps) => {
	const triggerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!hasMore || isLoadingMore) return

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries
				if (entry?.isIntersecting) {
					onLoadMore()
				}
			},
			{
				root: null,
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
	}, [onLoadMore, isLoadingMore, hasMore])

	if (!hasMore) {
		return null
	}

	return (
		<div ref={triggerRef} className="flex justify-center py-4">
			{isLoadingMore && (
				<div className="text-sm text-muted-foreground">Loading more...</div>
			)}
		</div>
	)
}
