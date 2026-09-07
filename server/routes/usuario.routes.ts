import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, getRoles } from '../controllers/usuario.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMINISTRADOR'));

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.get('/roles', getRoles);

export default router;
