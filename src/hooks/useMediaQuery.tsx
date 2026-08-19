import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query.
 *
 * Only for state the layout can't express on its own. Anything that is purely a
 * matter of appearance stays in CSS, where it belongs; this exists because a
 * mobile menu left open across a resize to desktop has to actually close, not
 * just be hidden.
 */
export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

	useEffect(() => {
		const list = window.matchMedia(query);
		const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

		setMatches(list.matches);
		list.addEventListener('change', onChange);

		return () => list.removeEventListener('change', onChange);
	}, [query]);

	return matches;
};
