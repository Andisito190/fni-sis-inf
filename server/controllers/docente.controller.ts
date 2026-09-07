import { Response } from 'express';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getDocentes = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('docente')
      .select('*')
      .order('apellido');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createDocente = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, apellido, correo, telefono, foto } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Nombre y apellido son requeridos' });
    }
    const { data, error } = await supabase
      .from('docente')
      .insert({ nombre, apellido, correo, telefono, foto })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const updateDocente = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, foto, estado } = req.body;
    const update: any = {};
    if (nombre) update.nombre = nombre;
    if (apellido) update.apellido = apellido;
    if (correo !== undefined) update.correo = correo;
    if (telefono !== undefined) update.telefono = telefono;
    if (foto !== undefined) update.foto = foto;
    if (estado !== undefined) update.estado = estado;
    const { data, error } = await supabase
      .from('docente')
      .update(update)
      .eq('id_docente', Number(id))
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteDocente = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('docente')
      .delete()
      .eq('id_docente', Number(id));
    if (error) throw error;
    res.json({ message: 'Docente eliminado' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getDocenteMaterias = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('docente_materia')
      .select('*, materia:materia(*)')
      .eq('id_docente', Number(id));
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const assignDocenteMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id_docente, id_materia, paralelo, gestion } = req.body;
    const { data, error } = await supabase
      .from('docente_materia')
      .insert({
        id_docente,
        id_materia,
        paralelo,
        gestion,
      })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const unassignDocenteMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('docente_materia')
      .delete()
      .eq('id_docente_materia', Number(id));
    if (error) throw error;
    res.json({ message: 'Asignación eliminada' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
