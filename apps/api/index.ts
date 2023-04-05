import express, { json, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import router from './src/router';

import { log } from './src/log';
import { connectMongoDB } from './src/database';

const env = process.env.NODE_ENV;

config({
  path: '../../.env',
});

const PORT = process.env.PORT || 8080;

const app = express();

if (env != 'test') connectMongoDB();

app.use(cors());
app.use(json());

app.use('/api', router);
app.get('/', (_req: Request, res: Response) =>
  res.json({
    title: 'Pharma',
    version: '0.0.1',
  })
);

if (env != 'test')
  app.listen(PORT, () => log.info('app running in PORT: ' + PORT));

export default app;
