import { Route } from 'react-router-dom';
import Home from './views/Home';
import Tetris from './views/Tetris';
import PageNotFound from './views/PageNotFound';

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