import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    let folder = 'public/images';
    if (file.fieldname === 'foto_auxiliar') folder = 'public/images/auxiliares';
    else if (file.fieldname === 'foto_docente') folder = 'public/images/docentes';
    else if (file.fieldname === 'imagen_evento') folder = 'public/images/eventos';
    else if (file.fieldname === 'imagen_comunicado') folder = 'public/images/comunicados';
    cb(null, folder);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo imágenes.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/:tipo',
  authenticate,
  authorize('ADMINISTRADOR', 'EDITOR'),
  (req, res) => {
    const tipo = req.params.tipo;
    let fieldName = 'foto';
    if (tipo === 'auxiliar') fieldName = 'foto_auxiliar';
    else if (tipo === 'docente') fieldName = 'foto_docente';
    else if (tipo === 'evento') fieldName = 'imagen_evento';
    else if (tipo === 'comunicado') fieldName = 'imagen_comunicado';

    const uploadSingle = upload.single(fieldName);

    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No se envió ningún archivo' });
      }

      const filePath = `/images/${tipo === 'auxiliar' ? 'auxiliares' : tipo === 'docente' ? 'docentes' : tipo === 'evento' ? 'eventos' : 'comunicados'}/${req.file.filename}`;

      res.json({ path: filePath, filename: req.file.filename });
    });
  }
);

export default router;
