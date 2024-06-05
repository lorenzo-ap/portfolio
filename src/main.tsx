import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About.tsx';
import NoPage from './pages/NoPage.tsx';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import PageTitle from './components/PageTitle.tsx';
import { AnimatePresence } from 'framer-motion';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <PageTitle title="Welcome | Lorenzo" />

                <AnimatePresence mode="wait">
                    <Home key={'/'} />
                </AnimatePresence>
            </>
        ),
    },
    {
        path: '/about',
        element: (
            <>
                <PageTitle title="About | Lorenzo" />

                <AnimatePresence mode="wait">
                    <About key={'/about'} />
                </AnimatePresence>
            </>
        ),
    },
    {
        path: '/projects',
        element: (
            <>
                <PageTitle title="Projects | Lorenzo" />

                <AnimatePresence mode="wait">
                    <Projects key={'/projects'} />
                </AnimatePresence>
            </>
        ),
    },
    {
        path: '*',
        element: (
            <>
                <PageTitle title="404. | Lorenzo" />

                <AnimatePresence mode="wait">
                    <NoPage key={'/*'} />
                </AnimatePresence>
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
