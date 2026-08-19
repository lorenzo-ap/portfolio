import type { RefObject } from 'react';
import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab inside `ref` while `active`, and hands focus back to wherever it
 * came from on the way out.
 *
 * Elements hidden at the current breakpoint are filtered out rather than
 * assumed absent: the header keeps its desktop navigation in the DOM and turns
 * it off with `display: none`, and tabbing into something invisible is worse
 * than not trapping at all.
 */
export const useFocusTrap = (ref: RefObject<HTMLElement>, active: boolean) => {
	useEffect(() => {
		const root = ref.current;

		if (!(active && root)) return;

		const previous = document.activeElement as HTMLElement | null;
		const focusable = () =>
			Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => element.offsetParent !== null);

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;

			const items = focusable();

			if (items.length === 0) return;

			const [first] = items;
			const [last] = items.slice(-1);

			if (!(first && last)) return;

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			previous?.focus?.();
		};
	}, [active, ref]);
};
