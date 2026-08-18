import { useReducedMotion } from 'framer-motion';
import { type PointerEvent, useCallback, useEffect, useRef } from 'react';

/**
 * Pulls an element a few pixels towards the cursor while it's inside the
 * element's own box. Only the primary call to action uses this: a page where
 * everything reacts to the pointer reads as a demo, where one thing reacting
 * reads as attention.
 *
 * Position is written as a CSS custom property rather than React state, so
 * tracking the cursor costs one compositor repaint and no re-render. `.magnetic`
 * in index.scss turns those properties into a transform.
 */
export const useMagnetic = <T extends HTMLElement>(strength = 0.22) => {
	const ref = useRef<T>(null);
	const frame = useRef(0);
	const prefersReducedMotion = useReducedMotion();

	const reset = useCallback(() => {
		const element = ref.current;

		if (!element) return;

		element.style.setProperty('--magnet-x', '0px');
		element.style.setProperty('--magnet-y', '0px');
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
				const offsetX = clientX - (rect.left + rect.width / 2);
				const offsetY = clientY - (rect.top + rect.height / 2);

				element.style.setProperty('--magnet-x', `${offsetX * strength}px`);
				element.style.setProperty('--magnet-y', `${offsetY * strength}px`);
			});
		},
		[prefersReducedMotion, strength]
	);

	return { ref, onPointerMove, onPointerLeave: reset, onBlur: reset };
};
