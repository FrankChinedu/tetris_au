import { Route } from 'react-router-dom';
import Home from './views/Home';
import MultiPlayerSteps from './views/MultiPlayerSteps';
import SingleGame from './views/Tetris/Single';
import MultiplayerGame from './views/Tetris/Multiplayer';
import PageNotFound from './views/PageNotFound';

import ROUTES from './utils/constants/routes';

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