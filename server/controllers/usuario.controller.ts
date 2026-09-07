import { Response } from 'express';
import bcrypt from 'bcrypt';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getUsuarios = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('id_usuario, nombre_u, estado, id_rol, rol:rol(nombre_rol)');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createUsuario = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre_u, contrasenia, id_rol } = req.body;
    if (!nombre_u || !contrasenia || !id_rol) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const { data, error } = await supabase
      .from('usuario')
      .insert({ nombre_u, contrasenia: hashedPassword, id_rol })
      .select('id_usuario, nombre_u, estado, rol:rol(nombre_rol)')
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const updateUsuario = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_u, contrasenia, id_rol, estado } = req.body;

    const update: any = {};
    if (nombre_u !== undefined) update.nombre_u = nombre_u;
    if (id_rol !== undefined) update.id_rol = id_rol;
    if (estado !== undefined) update.estado = estado;
    if (contrasenia) update.contrasenia = await bcrypt.hash(contrasenia, 10);

    const { data, error } = await supabase
      .from('usuario')
      .update(update)
      .eq('id_usuario', Number(id))
      .select('id_usuario, nombre_u, estado, rol:rol(nombre_rol)')
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error del servidor' });
  }
};

export const deleteUsuario = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('usuario')
      .delete()
      .eq('id_usuario', Number(id));
    if (error) throw error;
    res.json({ message: 'Usuario eliminado' });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getRoles = async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('rol')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
