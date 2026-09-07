import { Router } from 'express';
import { getComunicados, getComunicadoById, createComunicado, updateComunicado, deleteComunicado } from '../controllers/comunicado.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getComunicados);
router.get('/:id', getComunicadoById);

router.use(authenticate);
router.use(authorize('ADMINISTRADOR', 'EDITOR'));

router.post('/', createComunicado);
router.put('/:id', updateComunicado);
router.delete('/:id', deleteComunicado);

export default router;
