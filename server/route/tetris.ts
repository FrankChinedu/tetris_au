import express from 'express';
import TetrisController from '../module/Tetris';
import validator from '../middleware/tetris';
import { authenticate } from '../middleware/auth';

const Router = express.Router();

Router.use(authenticate);
Router.post('/', validator.create, TetrisController.createGameSession);

export default Router;
