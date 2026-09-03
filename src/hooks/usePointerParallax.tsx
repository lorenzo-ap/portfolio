import { useReducedMotion } from 'framer-motion';
import { type PointerEvent, useCallback, useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/**
 * Turns the pointer into two numbers on an element: `--px` and `--py`, each
 * running from -1 to 1 across its box.
 *
 * Nothing here decides how far anything moves. Every layer underneath reads the
 * same two numbers and multiplies them by its own depth, so a composition of a
 * dozen pieces costs one custom property write per frame and no React render.
 *
 * `reach` widens the area the numbers are measured over, because the element
 * being tracked isn't the element the pointer is on: the handler goes on the
 * whole hero, so the composition starts leaning while the cursor is still over
 * the headline.
 */
export const usePointerParallax = <T extends HTMLElement>(reach = 1) => {
	const ref = useRef<T>(null);
	const frame = useRef(0);
	const prefersReducedMotion = useReducedMotion();

	const reset = useCallback(() => {
		const element = ref.current;

		if (!element) return;

		element.style.setProperty('--px', '0');
		element.style.setProperty('--py', '0');
	}, []);

	useEffect(
		() => () => {
			if (frame.current) cancelAnimationFrame(frame.current);
		},
		[]
	);

	const onPointerMove = useCallback(
		(event: PointerEvent<HTMLElement>) => {
			const element = ref.current;

			if (!element || prefersReducedMotion || event.pointerType !== 'mouse') return;
			if (frame.current) return;

			const { clientX, clientY } = event;

			frame.current = requestAnimationFrame(() => {
				frame.current = 0;

				const rect = element.getBoundingClientRect();

				if (!(rect.width && rect.height)) return;

				const x = clamp((clientX - (rect.left + rect.width / 2)) / ((rect.width / 2) * reach));
				const y = clamp((clientY - (rect.top + rect.height / 2)) / ((rect.height / 2) * reach));

				element.style.setProperty('--px', x.toFixed(3));
				element.style.setProperty('--py', y.toFixed(3));
			});
		},
		[prefersReducedMotion, reach]
	);

	return { ref, onPointerMove, onPointerLeave: reset };
};
