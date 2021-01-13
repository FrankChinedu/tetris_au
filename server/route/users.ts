import express from 'express';
import UserController from '../module/User';
import userMiddleware from '../middleware/user';

const Router = express.Router();

Router.post('/signup', userMiddleware.create, UserController.signup);
Router.post('/login', userMiddleware.login, UserController.login);

export default Router;
