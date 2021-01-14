import { lazy } from 'react';


const Home = lazy(() => import('./views/Home'));
const Tetris = lazy(() => import('./views/Tetris'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));

export const routes = [
    {
        component: Home,
        path: '/',
    },
    {
        component: Tetris,
        path: '/game',
    },
    {
        component: PageNotFound,
        path: ['*', '/404/page-not-found'],
    },
];