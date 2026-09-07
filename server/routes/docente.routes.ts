import { Router } from 'express';
import { getDocentes, createDocente, updateDocente, deleteDocente, assignDocenteMateria, getDocenteMaterias, unassignDocenteMateria } from '../controllers/docente.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getDocentes);

router.use(authenticate);
router.use(authorize('ADMINISTRADOR', 'SUPERVISOR'));

router.get('/:id/materias', getDocenteMaterias);
router.post('/', createDocente);
router.put('/:id', updateDocente);
router.delete('/:id', deleteDocente);
router.post('/asignar', assignDocenteMateria);
router.delete('/asignar/:id', unassignDocenteMateria);

export default router;
