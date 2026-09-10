import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import supabase from '../config/database';
import type { AuthRequest } from '../middleware/auth.middleware';

const googleClient = new OAuth2Client(
  process.env.VITE_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || ''
);

const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';

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

export const loginGoogle = async (req: Request, res: Response) => {
  try {
    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: 'GOOGLE_CLIENT_ID no configurado' });
    }

    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Token de Google requerido' });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      return res.status(401).json({ error: 'Token de Google inválido' });
    }

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'No se pudo validar el token de Google' });
    }

    const email = payload.email;

    const { data: usuarioExistente, error: findErr } = await supabase
      .from('usuario')
      .select('*, rol:rol(*)')
      .eq('nombre_u', email)
      .maybeSingle();

    if (findErr) throw findErr;

    let usuario = usuarioExistente;

    if (!usuario) {
      const { data: rolEstudiante } = await supabase
        .from('rol')
        .select('id_rol')
        .eq('nombre_rol', 'ESTUDIANTE')
        .single();

      if (!rolEstudiante) {
        return res.status(500).json({ error: 'Rol ESTUDIANTE no configurado en la base de datos' });
      }

      const contraseniaRandom = randomBytes(32).toString('hex');
      const hashed = await bcrypt.hash(contraseniaRandom, 10);

      const { data: nuevo, error: createErr } = await supabase
        .from('usuario')
        .insert({
          nombre_u: email,
          contrasenia: hashed,
          id_rol: rolEstudiante.id_rol,
          estado: true,
        })
        .select('*, rol:rol(*)')
        .single();

      if (createErr) throw createErr;
      usuario = nuevo;
    }

    if (!usuario!.estado) {
      return res.status(403).json({ error: 'Usuario desactivado' });
    }

    const token = jwt.sign(
      { id: usuario!.id_usuario, role: usuario!.rol.nombre_rol },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario!.id_usuario,
        nombre: usuario!.nombre_u,
        rol: usuario!.rol.nombre_rol,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
