import { Response } from 'express';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getComunicados = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('comunicado')
      .select('*, usuario:usuario(nombre_u)')
      .order('fecha_publicacion', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getComunicadoById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('comunicado')
      .select('*, usuario:usuario(nombre_u)')
      .eq('id_comunicado', Number(id))
      .single();
    if (error || !data) return res.status(404).json({ error: 'Comunicado no encontrado' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createComunicado = async (req: AuthRequest, res: Response) => {
  try {
    const { titulo, contenido, fecha_vencimiento, archivo, imagen } = req.body;
    if (!titulo || !contenido) {
      return res.status(400).json({ error: 'Título y contenido son requeridos' });
    }
    const { data, error } = await supabase
      .from('comunicado')
      .insert({
        titulo,
        contenido,
        fecha_vencimiento: fecha_vencimiento || null,
        archivo,
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

export const updateComunicado = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, fecha_vencimiento, archivo, imagen, estado } = req.body;
    const update: any = {};
    if (titulo) update.titulo = titulo;
    if (contenido) update.contenido = contenido;
    if (fecha_vencimiento !== undefined) update.fecha_vencimiento = fecha_vencimiento || null;
    if (archivo !== undefined) update.archivo = archivo;
    if (imagen !== undefined) update.imagen = imagen;
    if (estado !== undefined) update.estado = estado;
    const { data, error } = await supabase
      .from('comunicado')
      .update(update)
      .eq('id_comunicado', Number(id))
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteComunicado = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('comunicado')
      .delete()
      .eq('id_comunicado', Number(id));
    if (error) throw error;
    res.json({ message: 'Comunicado eliminado' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
