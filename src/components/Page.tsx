import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { usePageTitle } from '../hooks';
import { Footer } from './Footer';
import { Header } from './Header';

interface PageProps extends PropsWithChildren {
	title: string;
	withHeader?: boolean;
}

export const Page = ({ title, withHeader, children }: PageProps) => {
	usePageTitle(title);

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				key={title}
				transition={{ duration: 0.15 }}
			>
				{withHeader && <Header />}
				{children}
				<Footer />
			</motion.div>
		</AnimatePresence>
	);
};
