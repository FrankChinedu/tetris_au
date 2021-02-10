import express, { Express, NextFunction, Request, Response } from 'express';
import * as path from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Socket, Server as SocketServer } from 'socket.io';

import Route from './route';
import { MONGO_URL, NODE_ENV } from './config/env';
import globalErrorHandle from './middleware/global-error-handler';
import GameIo from './io';

import 'express-async-errors';
class Server {
  private app: Express;

  constructor (app: Express) {
    this.app = app;

    this.app.use(json());
    this.app.use(cors());

    // this.app.use(express.static(`${path.resolve('./')}/build/client`));

    this.app.get('/api', (_req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.app.get('/', (_req: Request, res: Response): void => {
      res.send('home');
    });

    this.route(this.app);

    // if (NODE_ENV !== 'dev') {
    //   this.app.get('*', (_req: Request, res: Response): void => {
    //     res.sendFile(`${path.resolve('./')}/build/client/index.html`);
    //   });
    // }

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ error: 'Route not found' });
      next();
    });

    this.app.use(globalErrorHandle.handler);
  }

  public start (port: number): void {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }, () => {
      console.log('connects to Database');
      const server = this.app.listen(port, () => console.log(`Server listening on port ${port}!`));

      const io = this.socketIO(server);

      io.on('connection', (socket: Socket) => {
        GameIo(socket, io);
        // console.log('socket --socket connected');
      });
    });
  }

  public route (app: Express): void {
    Route(app);
  }

  public socketIO (app: any): SocketServer {
    const io = new SocketServer(app);
    return io;
  }
};

export default Server;
