import { useEffect, useRef } from 'react';

/**
 * Holds the page still while an overlay is open.
 *
 * `overflow: hidden` on the body is the usual trick and it doesn't work here
 * for two reasons: iOS Safari scrolls the page anyway, and the body carries
 * `overflow-x: clip` precisely so it never becomes a scroll container, which is
 * what keeps the pinned work stage sticky. So the body is taken out of the flow
 * at its current offset instead, and put back exactly where it was on close.
 *
 * `restoreKey` is what the offset belongs to. Closing the overlay by following a
 * link inside it changes the page underneath, and putting the visitor back at
 * "1400px down" on a page they've never seen is worse than doing nothing at
 * all. When the key has changed by the time the lock lifts, the offset is
 * dropped and the new page opens where it should, at the top.
 *
 * The attribute on `<html>` is there so CSS can react to the overlay without
 * threading state through to components that only need to get out of the way.
 */
export const useScrollLock = (locked: boolean, restoreKey?: string) => {
	const keyRef = useRef(restoreKey);

	keyRef.current = restoreKey;

	useEffect(() => {
		if (!locked) return;

		const { body, documentElement } = document;
		const offset = window.scrollY;
		const lockedAt = keyRef.current;
		const previous = { position: body.style.position, top: body.style.top, width: body.style.width };

		body.style.position = 'fixed';
		body.style.top = `-${offset}px`;
		body.style.width = '100%';
		documentElement.dataset.navOpen = 'true';

		return () => {
			body.style.position = previous.position;
			body.style.top = previous.top;
			body.style.width = previous.width;
			delete documentElement.dataset.navOpen;

			if (keyRef.current !== lockedAt) return;

			// `html` has smooth scrolling, and a scroll restore that animates
			// reads as the page sliding away under the closing sheet.
			window.scrollTo({ top: offset, behavior: 'instant' });
		};
	}, [locked]);
};
