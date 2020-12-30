import express, { Express, Request, Response } from 'express';
import * as path from 'path';

class Server {
  private app: Express;

  constructor (app: Express) {
    this.app = app;

    this.app.use(express.static(`${path.resolve('./')}/build/client`));

    this.app.get('/api', (_req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.app.get('*', (_req: Request, res: Response): void => {
      res.sendFile(`${path.resolve('./')}/build/client/index.html`);
    });
  }

  public start (port: number): void {
    this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}

export default Server;
