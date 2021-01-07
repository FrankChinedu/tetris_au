import express from 'express';
import dotenv from 'dotenv';

import Server from './server';
import { APP_PORT } from './server/config/env';

const app = express();
dotenv.config();

const port = Number(APP_PORT);

const server = new Server(app);
server.start(port);
