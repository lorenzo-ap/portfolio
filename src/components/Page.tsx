import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { useSeo } from '../hooks';
import { pageTransition } from '../lib/motion';
import type { PageTitleKey } from '../types';

interface PageProps extends PropsWithChildren {
	titleKey: PageTitleKey;
	descriptionKey?: 'home' | 'work' | 'about';
}

/**
 * The single place a route becomes a page: SEO tags, the shared entrance/exit
 * transition, and the landmark the skip link targets.
 */
export const Page = ({ titleKey, descriptionKey, children }: PageProps) => {
	useSeo({ titleKey, descriptionKey });

	return (
		<motion.main
			animate='visible'
			className='pt-[68px]'
			exit='exit'
			id='main'
			initial='hidden'
			variants={pageTransition}
		>
			{children}
		</motion.main>
	);
};
