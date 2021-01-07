import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mongoose from 'mongoose';
import { Socket, Server as SocketServer } from 'socket.io';

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

    this.route(this.app);

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
      const server = this.app.listen(port, () => console.log(`Server listening on port ${port}!`));

      const io = this.socketIO(server);

      io.on('connection', (socket: Socket) => {
        setTimeout(() => {
          socket.emit('start_game');
          console.log('done');
        }, 3000);
        console.log('socker --socker coneected');
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
