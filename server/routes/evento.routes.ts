import { Router } from 'express';
import { getEventos, getEventoById, createEvento, updateEvento, deleteEvento } from '../controllers/evento.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getEventos);
router.get('/:id', getEventoById);

router.use(authenticate);
router.use(authorize('ADMINISTRADOR', 'EDITOR'));

router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;
