import { useLenis } from 'lenis/react';
import { useCallback } from 'react';

/**
 * The one way back to the top of the page.
 *
 * With smooth scrolling in charge, a bare `window.scrollTo` fights it: Lenis
 * turns the page's own `scroll-behavior` off and would be handed a jump it
 * didn't animate. So the trip goes through Lenis when it's running, and falls
 * back to the browser when it isn't, which is the reduced-motion case.
 */
export const useScrollToTop = () => {
	const lenis = useLenis();

	return useCallback(
		(immediate = false) => {
			if (lenis) {
				lenis.scrollTo(0, { immediate, force: true });
				return;
			}

			window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
		},
		[lenis]
	);
};
