import { Route } from 'react-router-dom';
import Home from './views/Home';
import SingleGame from './views/Tetris/Single';
import MultiplayerGame from './views/Tetris/Multiplayer';
import PageNotFound from './views/PageNotFound';

export const routes = [
    {
        component: Home,
        path: '/',
        RouteType: Route,
    },
    {
        component: SingleGame,
        path: '/game',
        RouteType: Route,
    },
    {
        component: MultiplayerGame,
        path: '/multi-game',
        RouteType: Route,
    },
    {
        component: PageNotFound,
        path: ['*', '/404/page-not-found'],
        RouteType: Route,
    },
];