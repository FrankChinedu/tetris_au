import { Express, Response, Request, NextFunction } from 'express';
import userRoute from './users';
import tetrisRoute from './tetris';
import leaderBoard from './leader-board';

const api = '/api/v1';
export default (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers) {
      res.set(req.headers);
    } else {
      res.set({ 'Content-Type': 'application/json' });
    }
    next();
  });
  app.use(`${api}/user`, userRoute);
  app.use(`${api}/tetris`, tetrisRoute);
  app.use(`${api}/leader-board`, leaderBoard);
};
