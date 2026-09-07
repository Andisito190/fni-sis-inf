import axios from 'axios';
import type { PersonaAcademica, Evento, Comunicado, Materia } from '../types';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/public`;

export const getAuxiliares = async (): Promise<PersonaAcademica[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/auxiliares`);
    return data.map((a: any) => ({
      id: a.id_auxiliar,
      nombre: a.nombre,
      apellido: a.apellido,
      correo: a.correo || '',
      telefono: a.telefono || '',
      foto: a.foto || '',
      materias: (a.auxiliar_materia || []).map((am: any) => ({
        nombre: am.materia?.nombre_m || '',
        sigla: am.materia?.sigla_m || '',
        paralelo: am.paralelo || '',
        gestion: am.gestion || '',
      })),
    }));
  } catch {
    return [];
  }
};

export const getDocentes = async (): Promise<PersonaAcademica[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/docentes`);
    return data.map((d: any) => ({
      id: d.id_docente,
      nombre: d.nombre,
      apellido: d.apellido,
      correo: d.correo || '',
      telefono: d.telefono || '',
      foto: d.foto || '',
      titulo: '',
      especialidad: '',
      materias: (d.docente_materia || []).map((dm: any) => ({
        nombre: dm.materia?.nombre_m || '',
        sigla: dm.materia?.sigla_m || '',
        paralelo: dm.paralelo || '',
        gestion: dm.gestion || '',
      })),
    }));
  } catch {
    return [];
  }
};

export const getEventos = async (): Promise<Evento[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/eventos`);
    return data.map((e: any) => ({
      id: e.id_evento,
      titulo: e.titulo,
      imagen: e.imagen || '/images/eventos/default.jpg',
      fecha: e.fecha_inicio,
      hora: new Date(e.fecha_inicio).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }),
      lugar: e.lugar || '',
      descripcion: e.descripcion,
      contenido: e.descripcion,
    }));
  } catch {
    return [];
  }
};

export const getEventoById = async (id: number): Promise<Evento | undefined> => {
  try {
    const { data } = await axios.get(`${API_BASE}/eventos/${id}`);
    return {
      id: data.id_evento,
      titulo: data.titulo,
      imagen: data.imagen || '/images/eventos/default.jpg',
      fecha: data.fecha_inicio,
      hora: new Date(data.fecha_inicio).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }),
      lugar: data.lugar || '',
      descripcion: data.descripcion,
      contenido: data.descripcion,
    };
  } catch {
    return undefined;
  }
};

export const getComunicados = async (): Promise<Comunicado[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/comunicados`);
    return data.map((c: any) => ({
      id: c.id_comunicado,
      titulo: c.titulo,
      imagen: c.imagen || '/images/comunicados/default.jpg',
      fecha: c.fecha_publicacion,
      resumen: c.contenido.slice(0, 200),
      contenido: c.contenido,
      pdfUrl: c.archivo || undefined,
    }));
  } catch {
    return [];
  }
};

export const getComunicadoById = async (id: number): Promise<Comunicado | undefined> => {
  try {
    const { data } = await axios.get(`${API_BASE}/comunicados/${id}`);
    return {
      id: data.id_comunicado,
      titulo: data.titulo,
      imagen: data.imagen || '/images/comunicados/default.jpg',
      fecha: data.fecha_publicacion,
      resumen: data.contenido.slice(0, 200),
      contenido: data.contenido,
      pdfUrl: data.archivo || undefined,
    };
  } catch {
    return undefined;
  }
};

export const getMaterias = async (): Promise<Materia[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/materias`);
    return data.map((m: any) => ({
      id: m.id_materia,
      nombre: m.nombre_m,
      sigla: m.sigla_m,
      descripcion: m.descripcion || '',
      paralelo: '',
      gestion: '',
    }));
  } catch {
    return [];
  }
};
