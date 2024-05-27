import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About.tsx';
import NoPage from './pages/NoPage.tsx';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import PageTitle from './components/PageTitle.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <PageTitle title="Welcome | Lorenzo" />
                <Home />
            </>
        ),
    },
    {
        path: '/about',
        element: (
            <>
                <PageTitle title="About | Lorenzo" />
                <About />
            </>
        ),
    },
    {
        path: '/projects',
        element: (
            <>
                <PageTitle title="Projects | Lorenzo" />
                <Projects />
            </>
        ),
    },
    {
        path: '*',
        element: (
            <>
                <PageTitle title="404. | Lorenzo" />
                <NoPage />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className="flex flex-col justify-center gap-y-[50px] max-w-[700px] my-[50px] mx-auto">
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
);
