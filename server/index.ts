import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes';
import publicRoutes from './routes/public.routes';
import usuarioRoutes from './routes/usuario.routes';
import comunicadoRoutes from './routes/comunicado.routes';
import eventoRoutes from './routes/evento.routes';
import docenteRoutes from './routes/docente.routes';
import auxiliarRoutes from './routes/auxiliar.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/usuarios', usuarioRoutes);
app.use('/api/comunicados', comunicadoRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/auxiliares', auxiliarRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
