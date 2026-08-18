import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold`.
 *
 * The header used to step out of the way while you scrolled forwards. It
 * doesn't any more: navigation that vanishes is navigation you have to go
 * looking for, and one that's always there costs nothing but a strip of glass.
 * So this reads one thing, and the bar changes shape rather than leaving.
 */
export const useHeaderState = (threshold = 16) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		let frame = 0;

		const read = () => {
			frame = 0;
			setScrolled(window.scrollY > threshold);
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

	return scrolled;
};
