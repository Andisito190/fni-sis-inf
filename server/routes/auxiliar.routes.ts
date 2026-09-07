import { Router } from 'express';
import { getAuxiliares, createAuxiliar, updateAuxiliar, deleteAuxiliar, assignAuxiliarMateria, getAuxiliarMaterias, unassignAuxiliarMateria, getMaterias, createMateria, updateMateria, deleteMateria } from '../controllers/auxiliar.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAuxiliares);
router.get('/materias', getMaterias);

router.use(authenticate);
router.use(authorize('ADMINISTRADOR', 'SUPERVISOR'));

router.get('/:id/materias', getAuxiliarMaterias);
router.post('/', createAuxiliar);
router.put('/:id', updateAuxiliar);
router.delete('/:id', deleteAuxiliar);
router.post('/asignar', assignAuxiliarMateria);
router.delete('/asignar/:id', unassignAuxiliarMateria);
router.post('/materias', createMateria);
router.put('/materias/:id', updateMateria);
router.delete('/materias/:id', deleteMateria);

export default router;
