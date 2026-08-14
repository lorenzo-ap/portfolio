import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { usePageTitle } from '../hooks';
import type { PageTitleKey } from '../types';
import { Footer } from './Footer';
import { Header } from './Header';

interface PageProps extends PropsWithChildren {
	titleKey: PageTitleKey;
	withHeader?: boolean;
}

export const Page = ({ titleKey, withHeader, children }: PageProps) => {
	usePageTitle(titleKey);

	return (
		<>
			{withHeader && <Header />}

			<motion.div
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				transition={{ duration: 0.15 }}
			>
				{children}
			</motion.div>

			<Footer />
		</>
	);
};
