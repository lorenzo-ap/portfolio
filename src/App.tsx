import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Page } from './components';
import { useTheme } from './hooks';
import { AboutPage, ErrorPage, HomePage, ProjectsPage } from './pages';

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes key={location.pathname} location={location}>
				<Route
					element={
						<Page title='Welcome | Lorenzo'>
							<HomePage />
						</Page>
					}
					path='/'
				/>
				<Route
					element={
						<Page title='About | Lorenzo' withHeader>
							<AboutPage />
						</Page>
					}
					path='/about'
				/>
				<Route
					element={
						<Page title='Projects | Lorenzo' withHeader>
							<ProjectsPage />
						</Page>
					}
					path='/projects'
				/>
				<Route
					element={
						<Page title='404. | Lorenzo'>
							<ErrorPage />
						</Page>
					}
					path='*'
				/>
			</Routes>
		</AnimatePresence>
	);
};

export const App = () => {
	useTheme();

	return (
		<BrowserRouter
			future={{
				v7_relativeSplatPath: true,
				v7_startTransition: true
			}}
		>
			<div className='mx-auto flex min-h-dvh max-w-[700px] flex-col justify-center gap-y-[50px]'>
				<AnimatedRoutes />
			</div>
		</BrowserRouter>
	);
};
