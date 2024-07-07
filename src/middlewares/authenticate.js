import createHttpError from 'http-errors';

import { SessionCollection } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log('😎 ~ authenticate ~ authHeader:', authHeader);

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Authorization header should be of type Bearer'));
    return;
  }

  const session = await SessionCollection.findOne({
    accessToken: token,
  });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await User.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
