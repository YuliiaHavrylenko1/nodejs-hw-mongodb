import { Router } from 'express';
import { getUsers, addUser } from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
