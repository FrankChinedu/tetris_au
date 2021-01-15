import { lazy } from 'react';
import { Route } from 'react-router-dom';


const Home = lazy(() => import('./views/Home'));
const Tetris = lazy(() => import('./views/Tetris'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));

export const routes = [
    {
        component: Home,
        path: '/',
        RouteType: Route,
    },
    {
        component: Tetris,
        path: '/game',
        RouteType: Route,
    },
    {
        component: PageNotFound,
        path: ['*', '/404/page-not-found'],
        RouteType: Route,
    },
];