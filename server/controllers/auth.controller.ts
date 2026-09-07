import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

export const login = async (req: Request, res: Response) => {
  try {
    const { nombre_u, contrasenia } = req.body;
    if (!nombre_u || !contrasenia) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    const { data: usuario, error } = await supabase
      .from('usuario')
      .select('*, rol:rol(*)')
      .eq('nombre_u', nombre_u)
      .single();

    if (error || !usuario || !usuario.estado) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const validPassword = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, role: usuario.rol.nombre_rol },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre_u,
        rol: usuario.rol.nombre_rol,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { data: usuario, error } = await supabase
      .from('usuario')
      .select('id_usuario, nombre_u, estado, rol:rol(nombre_rol)')
      .eq('id_usuario', req.userId)
      .single();

    if (error || !usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre_u,
      rol: usuario.rol.nombre_rol,
      estado: usuario.estado,
    });
  } catch {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
