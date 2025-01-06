import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page from './components/Page';
import './index.scss';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Projects from './pages/Projects';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Page title='Welcome | Lorenzo'>
        <Home />
      </Page>
    )
  },
  {
    path: '/about',
    element: (
      <Page title='About | Lorenzo'>
        <About />
      </Page>
    )
  },
  {
    path: '/projects',
    element: (
      <Page title='Projects | Lorenzo'>
        <Projects />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex flex-col justify-center gap-y-[50px] max-w-[700px] my-[50px] mx-auto'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
