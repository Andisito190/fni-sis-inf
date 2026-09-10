import { Router } from 'express';
import { login, loginGoogle, getProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/google', loginGoogle);
router.get('/profile', authenticate, getProfile);

export default router;
