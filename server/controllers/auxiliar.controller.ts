import { Response } from 'express';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getAuxiliares = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('auxiliar')
      .select('*')
      .order('apellido');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createAuxiliar = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, apellido, correo, telefono, foto } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Nombre y apellido son requeridos' });
    }
    const { data, error } = await supabase
      .from('auxiliar')
      .insert({ nombre, apellido, correo, telefono, foto })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const updateAuxiliar = async (req: AuthRequest, res: Response) => {
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
      .from('auxiliar')
      .update(update)
      .eq('id_auxiliar', Number(id))
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteAuxiliar = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('auxiliar')
      .delete()
      .eq('id_auxiliar', Number(id));
    if (error) throw error;
    res.json({ message: 'Auxiliar eliminado' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getAuxiliarMaterias = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('auxiliar_materia')
      .select('*, materia:materia(*)')
      .eq('id_auxiliar', Number(id));
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const assignAuxiliarMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id_auxiliar, id_materia, paralelo, gestion } = req.body;
    const { data, error } = await supabase
      .from('auxiliar_materia')
      .insert({
        id_auxiliar,
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

export const unassignAuxiliarMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('auxiliar_materia')
      .delete()
      .eq('id_auxiliar_materia', Number(id));
    if (error) throw error;
    res.json({ message: 'Asignación eliminada' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getMaterias = async (_req: AuthRequest, res: Response) => {
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
};

export const createMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre_m, sigla_m, descripcion } = req.body;
    if (!nombre_m || !sigla_m) {
      return res.status(400).json({ error: 'Nombre y sigla son requeridos' });
    }
    const { data, error } = await supabase
      .from('materia')
      .insert({ nombre_m, sigla_m, descripcion })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const updateMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_m, sigla_m, descripcion } = req.body;
    const update: any = {};
    if (nombre_m) update.nombre_m = nombre_m;
    if (sigla_m) update.sigla_m = sigla_m;
    if (descripcion !== undefined) update.descripcion = descripcion;
    const { data, error } = await supabase
      .from('materia')
      .update(update)
      .eq('id_materia', Number(id))
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteMateria = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('materia')
      .delete()
      .eq('id_materia', Number(id));
    if (error) throw error;
    res.json({ message: 'Materia eliminada' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
