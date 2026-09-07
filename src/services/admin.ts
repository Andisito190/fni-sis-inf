import adminApi from './adminApi';
import type {
  Usuario, Comunicado, Evento, Docente, Auxiliar, Materia, Rol,
  LoginPayload, LoginResponse,
} from '../types/admin';

export const adminLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await adminApi.post('/auth/login', payload);
  return data;
};

export const adminGetProfile = async () => {
  const { data } = await adminApi.get('/auth/profile');
  return data;
};

export const adminGetUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await adminApi.get('/admin/usuarios');
  return data.map((u: any) => ({
    idUsuario: u.id_usuario,
    nombreU: u.nombre_u,
    estado: u.estado,
    idRol: u.id_rol,
    rol: { nombreRol: u.rol?.nombre_rol || '' },
  }));
};

export const adminCreateUsuario = async (payload: { nombre_u: string; contrasenia: string; id_rol: number }) => {
  const { data } = await adminApi.post('/admin/usuarios', payload);
  return data;
};

export const adminUpdateUsuario = async (id: number, payload: { nombre_u?: string; contrasenia?: string; id_rol?: number; estado?: boolean }) => {
  const { data } = await adminApi.put(`/admin/usuarios/${id}`, payload);
  return data;
};

export const adminDeleteUsuario = async (id: number) => {
  await adminApi.delete(`/admin/usuarios/${id}`);
};

export const adminGetRoles = async (): Promise<Rol[]> => {
  const { data } = await adminApi.get('/admin/usuarios/roles');
  return data.map((r: any) => ({ idRol: r.id_rol, nombreRol: r.nombre_rol }));
};

export const adminGetComunicados = async (): Promise<Comunicado[]> => {
  const { data } = await adminApi.get('/comunicados');
  return data.map((c: any) => ({
    idComunicado: c.id_comunicado,
    titulo: c.titulo,
    contenido: c.contenido,
    fechaPublicacion: c.fecha_publicacion,
    fechaVencimiento: c.fecha_vencimiento,
    archivo: c.archivo,
    imagen: c.imagen,
    estado: c.estado,
    idUsuario: c.id_usuario,
    usuario: c.usuario ? { nombreU: c.usuario.nombre_u } : undefined,
  }));
};

export const adminCreateComunicado = async (payload: any) => {
  const { data } = await adminApi.post('/comunicados', payload);
  return data;
};

export const adminUpdateComunicado = async (id: number, payload: any) => {
  const { data } = await adminApi.put(`/comunicados/${id}`, payload);
  return data;
};

export const adminDeleteComunicado = async (id: number) => {
  await adminApi.delete(`/comunicados/${id}`);
};

export const adminGetEventos = async (): Promise<Evento[]> => {
  const { data } = await adminApi.get('/eventos');
  return data.map((e: any) => ({
    idEvento: e.id_evento,
    titulo: e.titulo,
    descripcion: e.descripcion,
    fechaInicio: e.fecha_inicio,
    fechaFin: e.fecha_fin,
    lugar: e.lugar,
    imagen: e.imagen,
    estado: e.estado,
    idUsuario: e.id_usuario,
    usuario: e.usuario ? { nombreU: e.usuario.nombre_u } : undefined,
  }));
};

export const adminCreateEvento = async (payload: any) => {
  const { data } = await adminApi.post('/eventos', payload);
  return data;
};

export const adminUpdateEvento = async (id: number, payload: any) => {
  const { data } = await adminApi.put(`/eventos/${id}`, payload);
  return data;
};

export const adminDeleteEvento = async (id: number) => {
  await adminApi.delete(`/eventos/${id}`);
};

export const adminGetDocentes = async (): Promise<Docente[]> => {
  const { data } = await adminApi.get('/docentes');
  return data.map((d: any) => ({
    idDocente: d.id_docente,
    nombre: d.nombre,
    apellido: d.apellido,
    correo: d.correo,
    telefono: d.telefono,
    foto: d.foto,
    estado: d.estado,
    materias: [],
  }));
};

export const adminCreateDocente = async (payload: any) => {
  const { data } = await adminApi.post('/docentes', payload);
  return data;
};

export const adminUpdateDocente = async (id: number, payload: any) => {
  const { data } = await adminApi.put(`/docentes/${id}`, payload);
  return data;
};

export const adminDeleteDocente = async (id: number) => {
  await adminApi.delete(`/docentes/${id}`);
};

export const adminGetAuxiliares = async (): Promise<Auxiliar[]> => {
  const { data } = await adminApi.get('/auxiliares');
  return data.map((a: any) => ({
    idAuxiliar: a.id_auxiliar,
    nombre: a.nombre,
    apellido: a.apellido,
    correo: a.correo,
    telefono: a.telefono,
    foto: a.foto,
    estado: a.estado,
    materias: [],
  }));
};

export const adminCreateAuxiliar = async (payload: any) => {
  const { data } = await adminApi.post('/auxiliares', payload);
  return data;
};

export const adminUpdateAuxiliar = async (id: number, payload: any) => {
  const { data } = await adminApi.put(`/auxiliares/${id}`, payload);
  return data;
};

export const adminDeleteAuxiliar = async (id: number) => {
  await adminApi.delete(`/auxiliares/${id}`);
};

export const adminGetMaterias = async (): Promise<Materia[]> => {
  const { data } = await adminApi.get('/auxiliares/materias');
  return data.map((m: any) => ({ idMateria: m.id_materia, nombreM: m.nombre_m, siglaM: m.sigla_m, descripcion: m.descripcion || '' }));
};
