import express, { json, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { config } from 'dotenv';
import cors from 'cors';

import router from './src/router';

import { log } from './src/log';
import { connectMongoDB } from './src/database';

const env = process.env.NODE_ENV;

config({
  path: '../../.env',
});

const PORT = process.env.PORT;

const app = express();

if (env != 'test') connectMongoDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.use(json());

if (env == 'production') app.use(limiter);

app.use('/api', router);
app.get('/', (_req: Request, res: Response) =>
  res.json({
    title: 'Pharma',
    version: '0.0.1',
  })
);

if (env != 'test')
  app.listen(PORT, () => log.info('App running in PORT: ' + PORT));

export default app;
