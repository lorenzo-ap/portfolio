import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import { Page } from './components';
import { useTheme } from './hooks';
import { AboutPage, ErrorPage, HomePage, ProjectsPage } from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Page title='Welcome | Lorenzo'>
				<HomePage />
			</Page>
		)
	},
	{
		path: '/about',
		element: (
			<Page title='About | Lorenzo' withHeader>
				<AboutPage />
			</Page>
		)
	},
	{
		path: '/projects',
		element: (
			<Page title='Projects | Lorenzo' withHeader>
				<ProjectsPage />
			</Page>
		)
	},
	{
		path: '*',
		element: (
			<Page title='404. | Lorenzo'>
				<ErrorPage />
			</Page>
		)
	}
]);

export const App = () => {
	useTheme();

	return (
		<div className='mx-auto flex min-h-dvh max-w-[700px] flex-col justify-center gap-y-[50px]'>
			<RouterProvider router={router} />
		</div>
	);
};
