import express from 'express';
import LeaderBoardController from '../module/LeaderBoard';
import LeaderBoardMid from '../middleware/leader-board';
import { authenticate, hasOnlyUserName } from '../middleware/auth';

const Router = express.Router();

Router.get('/', LeaderBoardMid.get, LeaderBoardController.get);

Router.use(hasOnlyUserName);
Router.use(authenticate);

Router.post('/', LeaderBoardMid.post, LeaderBoardController.post);

export default Router;
