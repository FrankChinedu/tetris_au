import { lazy } from 'react';
import { Route } from 'react-router-dom';
// import Home from './views/Home';
// import MultiPlayerSteps from './views/MultiPlayerSteps';
// import SingleGame from './views/Tetris/Single';
// import MultiplayerGame from './views/Tetris/Multiplayer';
// import PageNotFound from './views/PageNotFound';

import ROUTES from './utils/constants/routes';

const Home = lazy(() => import('./views/Home'));
const MultiPlayerSteps = lazy(() => import('./views/MultiPlayerSteps'));
const SingleGame = lazy(() => import('./views/Tetris/Single'));
const MultiplayerGame = lazy(() => import('./views/Tetris/Multiplayer'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));

export const routes = [
    {
        component: Home,
        path: ROUTES.home,
        RouteType: Route,
    },
    {
        component: SingleGame,
        path: ROUTES.singleGame,
        RouteType: Route,
    },
    {
        component: MultiplayerGame,
        path: ROUTES.multiGame,
        RouteType: Route,
    },
    {
        component: MultiPlayerSteps,
        path: ROUTES.multiGameSteps,
        RouteType: Route,
    },
    {
        component: PageNotFound,
        path: ['*', ROUTES.notFound],
        RouteType: Route,
    },
];