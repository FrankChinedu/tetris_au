import { lazy } from 'react';
import { Route } from 'react-router-dom';

import ROUTES from './utils/constants/routes';

const Home = lazy(() => import('./views/Home'));
const MultiPlayerSteps = lazy(() => import('./views/MultiPlayerSteps'));
const SingleGame = lazy(() => import('./views/Tetris/Single'));
const MultiplayerGame = lazy(() => import('./views/Tetris/Multiplayer'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));
const HowToPlay = lazy(() => import('./views/HowToPlay'));
const Leaderboard = lazy(() => import('./views/Leaderboard'));
const test = lazy(() => import('./views/test'));
const AddUsername = lazy(() => import('./views/AddUsername'));
const Settings = lazy(() => import('./views/Settings'));


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
        component: HowToPlay,
        path: ROUTES.howToPlay,
        RouteType: Route,
    },
    {
        component: Leaderboard,
        path: ROUTES.leaderboard,
        RouteType: Route,
    },
    {
        component: Settings,
        path: ROUTES.settings,
        RouteType: Route,
    },
    {
        component: test,
        path: ROUTES.test,
        RouteType: Route,
    },
    {
        component: AddUsername,
        path: ROUTES.addUsername,
        RouteType: Route,
    },
    {
        component: PageNotFound,
        path: ['*', ROUTES.notFound],
        RouteType: Route,
    },
];