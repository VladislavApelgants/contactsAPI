import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';

export const server = () => {
  const app = express();
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

  app.get('/', (req, res) => {
    res.json('Hello');
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
