import express from 'express';
import dotenv from 'dotenv';

import Server from './server';

const app = express();
dotenv.config();

const port = (process.env.PORT || 3002) as number;

const server = new Server(app);
server.start(port);
