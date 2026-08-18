import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Cursor, Footer, Header, Page, ScrollProgress } from './components';
import { AboutPage, ErrorPage, HomePage, WorkPage } from './pages';

/** Every route change starts at the top, including browser back/forward. */
const ScrollToTop = () => {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [pathname]);

	return null;
};

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes key={location.pathname} location={location}>
				<Route
					element={
						<Page descriptionKey='home' titleKey='home'>
							<HomePage />
						</Page>
					}
					path='/'
				/>
				<Route
					element={
						<Page descriptionKey='work' titleKey='work'>
							<WorkPage />
						</Page>
					}
					path='/work'
				/>
				{/* The old URL, kept alive so existing links and search results still resolve. */}
				<Route element={<Navigate replace to='/work' />} path='/projects' />
				<Route
					element={
						<Page descriptionKey='about' titleKey='about'>
							<AboutPage />
						</Page>
					}
					path='/about'
				/>
				<Route
					element={
						<Page titleKey='error'>
							<ErrorPage />
						</Page>
					}
					path='*'
				/>
			</Routes>
		</AnimatePresence>
	);
};

export const App = () => (
	<MotionConfig reducedMotion='user'>
		<BrowserRouter
			future={{
				v7_relativeSplatPath: true,
				v7_startTransition: true
			}}
		>
			<ScrollToTop />
			<ScrollProgress />
			<Cursor />
			<Header />

			<div className='flex min-h-dvh flex-col'>
				<div className='flex-1'>
					<AnimatedRoutes />
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	</MotionConfig>
);
