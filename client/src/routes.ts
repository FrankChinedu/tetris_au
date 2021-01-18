import { Route } from 'react-router-dom';
import Home from './views/Home';
import Tetris from './views/Tetris';
import Tet from './views/Tet';
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
        component: Tet,
        path: '/pet',
        RouteType: Route,
    },
    {
        component: PageNotFound,
        path: ['*', '/404/page-not-found'],
        RouteType: Route,
    },
];