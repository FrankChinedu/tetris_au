import express from 'express';
import TetrisController from '../module/Tetris';
import validator from '../middleware/tetris';
import { authenticate, hasOnlyUserName } from '../middleware/auth';

const Router = express.Router();

Router.get('/stat', validator.get, TetrisController.get);

Router.use(hasOnlyUserName);
Router.use(authenticate);

Router.post('/', validator.create, TetrisController.createGameSession);

export default Router;
