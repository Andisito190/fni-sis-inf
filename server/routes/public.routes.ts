import { Router } from 'express';
import supabase from '../config/database';

const router = Router();

router.get('/auxiliares', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('auxiliar')
      .select('*, auxiliar_materia(*, materia(*))')
      .eq('estado', true)
      .order('apellido');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/docentes', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('docente')
      .select('*, docente_materia(*, materia(*))')
      .eq('estado', true)
      .order('apellido');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/eventos', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('evento')
      .select('*')
      .eq('estado', true)
      .order('fecha_inicio', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/eventos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('evento')
      .select('*')
      .eq('id_evento', Number(req.params.id))
      .single();
    if (error || !data) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/comunicados', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('comunicado')
      .select('*')
      .eq('estado', true)
      .order('fecha_publicacion', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/comunicados/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('comunicado')
      .select('*')
      .eq('id_comunicado', Number(req.params.id))
      .single();
    if (error || !data) return res.status(404).json({ error: 'Comunicado no encontrado' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/materias', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('materia')
      .select('*')
      .order('sigla_m');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
