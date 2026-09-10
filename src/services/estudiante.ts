import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth`;

export const studentLoginWithGoogle = async (credential: string) => {
  const { data } = await axios.post(`${API_BASE}/google`, { credential });
  return data as {
    token: string;
    usuario: { id: number; nombre: string; rol: string };
  };
};

export const studentLoginWithPassword = async (nombre_u: string, contrasenia: string) => {
  const { data } = await axios.post(`${API_BASE}/login`, { nombre_u, contrasenia });
  return data;
};