import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { useSeo } from '../hooks';
import { duration, ease } from '../lib/motion';
import type { PageTitleKey } from '../types';

interface PageProps extends PropsWithChildren {
	titleKey: PageTitleKey;
	descriptionKey?: 'home' | 'work' | 'about';
}

/**
 * The single place a route becomes a page: SEO tags, the shared entrance/exit
 * transition, and the landmark the skip link targets.
 *
 * The transition is written as plain objects rather than named variants on
 * purpose. A motion element with `variants` becomes a variant parent, and every
 * motion descendant then takes its animation state from it instead of from its
 * own `whileInView`. Since this element wraps the entire page, one page in
 * every few would mount with its whole tree latched to `hidden` and render
 * blank. Objects don't propagate, so each section is left to govern itself.
 */
export const Page = ({ titleKey, descriptionKey, children }: PageProps) => {
	useSeo({ titleKey, descriptionKey });

	return (
		<motion.main
			animate={{ opacity: 1, y: 0 }}
			className='pt-[var(--header-h)]'
			id='main'
			initial={{ opacity: 0, y: 18 }}
			transition={{ duration: duration.page, ease }}
		>
			{children}
		</motion.main>
	);
};
