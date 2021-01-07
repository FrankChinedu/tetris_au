import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mongoose from 'mongoose';
import { Socket, Server as SocketServer } from 'socket.io';
import { createServer } from 'http';

import Route from './route';
import { MONGO_URL, NODE_ENV } from './config/env';

class Server {
  private app: Express;

  constructor (app: Express) {
    this.app = app;

    this.app.use(json());
    this.app.use(cors());

    const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use(express.static(`${path.resolve('./')}/build/client`));

    this.app.get('/api', (_req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.route();

    const io = this.socketIO(this.app);

    io.on('connection', (socket: Socket) => {
      console.log('socket', socket);
      socket.on('connection', () => {
        console.log('we global');
      });
    });

    if (NODE_ENV !== 'dev') {
      this.app.get('*', (_req: Request, res: Response): void => {
        res.sendFile(`${path.resolve('./')}/build/client/index.html`);
      });
    }
  }

  public start (port: number): void {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }, () => {
      console.log('connectes to Database');
      this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    });
  }

  public route (): void {
    Route(this.app);
  }

  public socketIO (app: Express): SocketServer {
    const httpServer = createServer(app);
    const io = new SocketServer(httpServer);
    return io;
  }
};

export default Server;
