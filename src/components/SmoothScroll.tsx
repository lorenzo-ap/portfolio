import { useReducedMotion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';

/**
 * Inertial scrolling for the whole page.
 *
 * Every scroll-linked move on the site (the pinned work stage, the process
 * spine, the drift on posters and the portrait) reads the scroll position, so
 * the scroll position moving on a curve is what makes all of them move on a
 * curve. The page still scrolls natively underneath, which is what keeps
 * `position: sticky` and the browser's own scrollbar working.
 *
 * Touch is left alone: the platform's own inertia is better than anything
 * that could be simulated over it. Under reduced motion nothing is smoothed.
 */
export const SmoothScroll = ({ children }: PropsWithChildren) => {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) return <>{children}</>;

	return (
		<ReactLenis options={{ lerp: 0.085, smoothWheel: true, syncTouch: false, anchors: true }} root>
			{children}
		</ReactLenis>
	);
};
