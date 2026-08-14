import { useReducedMotion } from 'framer-motion';
import { type PointerEvent, useCallback, useEffect, useRef } from 'react';

/**
 * Writes pointer position onto the element as CSS custom properties.
 * No React state, so tracking the cursor never re-renders the tree.
 *
 * The returned `onPointerMove` goes on the section, not on the backdrop the ref
 * points at. The backdrop sits behind the content, so a native listener on it
 * would only ever see the margins. React events bubble up from the text and
 * buttons instead, and custom properties inherit back down to `.spotlight`.
 */
export const usePointerSpotlight = <T extends HTMLElement>() => {
	const ref = useRef<T>(null);
	const frame = useRef(0);
	const prefersReducedMotion = useReducedMotion();

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

				element.style.setProperty('--pointer-x', `${clientX - rect.left}px`);
				element.style.setProperty('--pointer-y', `${clientY - rect.top}px`);
			});
		},
		[prefersReducedMotion]
	);

	return { ref, onPointerMove };
};
