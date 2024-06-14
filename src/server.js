import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import { contactsServices } from './services/index.js';
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

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await contactsServices.getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:id', async (req, res, next) => {
    try {
      const contacts = await contactsServices.getContactById(req.params.id);

      if (!contacts) {
        res.status(404).json({ message: 'Not Found' });
        return;
      }

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
