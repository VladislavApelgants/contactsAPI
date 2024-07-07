import { Router } from 'express';
import contactsRouter from './contacts.js';
import usersRouter from './users.js';

const router = Router();
router.use('/auth', usersRouter);
router.use('/contacts', contactsRouter);

export default router;
