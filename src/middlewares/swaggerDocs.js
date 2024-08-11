import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';

import createHttpError from 'http-errors';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
