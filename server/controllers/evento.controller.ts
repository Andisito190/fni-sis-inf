import { Response } from 'express';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getEventos = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('evento')
      .select('*, usuario:usuario(nombre_u)')
      .order('fecha_inicio', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getEventoById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('evento')
      .select('*, usuario:usuario(nombre_u)')
      .eq('id_evento', Number(id))
      .single();
    if (error || !data) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createEvento = async (req: AuthRequest, res: Response) => {
  try {
    const { titulo, descripcion, fecha_inicio, fecha_fin, lugar, imagen } = req.body;
    if (!titulo || !descripcion || !fecha_inicio) {
      return res.status(400).json({ error: 'Título, descripción y fecha de inicio son requeridos' });
    }
    const { data, error } = await supabase
      .from('evento')
      .insert({
        titulo,
        descripcion,
        fecha_inicio,
        fecha_fin: fecha_fin || null,
        lugar,
        imagen,
        id_usuario: req.userId!,
      })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const updateEvento = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_fin, lugar, imagen, estado } = req.body;
    const update: any = {};
    if (titulo) update.titulo = titulo;
    if (descripcion) update.descripcion = descripcion;
    if (fecha_inicio) update.fecha_inicio = fecha_inicio;
    if (fecha_fin !== undefined) update.fecha_fin = fecha_fin || null;
    if (lugar !== undefined) update.lugar = lugar;
    if (imagen !== undefined) update.imagen = imagen;
    if (estado !== undefined) update.estado = estado;
    const { data, error } = await supabase
      .from('evento')
      .update(update)
      .eq('id_evento', Number(id))
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteEvento = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('evento')
      .delete()
      .eq('id_evento', Number(id));
    if (error) throw error;
    res.json({ message: 'Evento eliminado' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
