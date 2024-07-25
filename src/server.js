import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import { UPLOAD_DIR } from './constants/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', 3000));

export const server = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'res, remotePort, remoteAddress',
        },
      },
    }),
  );
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
