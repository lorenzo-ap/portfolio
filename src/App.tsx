import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Cursor, Footer, Header, Page, ScrollProgress, SmoothScroll } from './components';
import { useScrollToTop } from './hooks';
import { AboutPage, ErrorPage, HomePage, WorkPage } from './pages';

/** Every route change starts at the top, including browser back/forward. */
const ScrollToTop = () => {
	const { pathname } = useLocation();
	const scrollToTop = useScrollToTop();

	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads
	useEffect(() => {
		scrollToTop(true);
	}, [pathname]);

	return null;
};

/**
 * Routes animate in, and nothing animates out.
 *
 * An exit transition means the incoming page has to wait for the outgoing one
 * to finish, and anything that stops the outgoing animation from completing
 * leaves a page that has already faded to nothing sitting there for good. The
 * entrance is what a visitor actually reads as a transition anyway: the page
 * header's headline uncovers itself word by word on every route.
 */
const AnimatedRoutes = () => {
	const location = useLocation();

	return (
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
			<SmoothScroll>
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
			</SmoothScroll>
		</BrowserRouter>
	</MotionConfig>
);
