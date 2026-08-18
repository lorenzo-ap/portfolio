import { useEffect, useState } from 'react';

export interface HeaderState {
	/** Past the fold of the first screen, so the bar needs its own background. */
	scrolled: boolean;
	/** Reading downwards. The bar gets out of the way until the visitor scrolls back. */
	hidden: boolean;
}

const HIDE_AFTER = 160;
const DEAD_ZONE = 6;

/**
 * Scroll state for the header, read in one listener.
 *
 * The bar earns its background only after the hero, and it steps out of the way
 * while the visitor is reading forwards. Scrolling back up is the signal that
 * they want navigation again, which is the only moment it needs to be there.
 */
export const useHeaderState = (threshold = 16): HeaderState => {
	const [state, setState] = useState<HeaderState>({ scrolled: false, hidden: false });

	useEffect(() => {
		let lastY = window.scrollY;
		let frame = 0;

		const read = () => {
			frame = 0;

			const y = window.scrollY;
			const delta = y - lastY;

			if (Math.abs(delta) > DEAD_ZONE) {
				lastY = y;
			}

			setState((previous) => {
				const scrolled = y > threshold;
				// Never hide near the top, and never hide on a bounce-scroll overshoot.
				let hidden = previous.hidden;

				if (y > HIDE_AFTER && delta > DEAD_ZONE) hidden = true;
				if (delta < -DEAD_ZONE) hidden = false;

				if (scrolled === previous.scrolled && hidden === previous.hidden) return previous;

				return { scrolled, hidden };
			});
		};

		const onScroll = () => {
			if (frame) return;

			frame = requestAnimationFrame(read);
		};

		read();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [threshold]);

	return state;
};
