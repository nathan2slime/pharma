import express, { json, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import router from './src/router';

import { log } from './src/log';
import { database } from './src/database';

config({
  path: '../../.env',
});

const PORT = process.env.PORT;

const app = express();

database();
app.use(cors());
app.use(json());

app.get('/', (_req: Request, res: Response) =>
  res.json({
    title: 'Pharma',
    version: '0.0.1',
  })
);

app.use('/api', router);

app.listen(PORT, () => log.info('App running in PORT: ' + PORT));
