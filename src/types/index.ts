export interface Materia {
  id?: number;
  nombre: string;
  sigla: string;
  descripcion?: string;
  paralelo: string;
  gestion: string;
}

export interface PersonaAcademica {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  foto: string;
  materias: Materia[];
  titulo?: string;
  especialidad?: string;
}

export interface Evento {
  id: number;
  titulo: string;
  imagen: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  contenido?: string;
}

export interface Comunicado {
  id: number;
  titulo: string;
  imagen: string;
  fecha: string;
  resumen: string;
  contenido?: string;
  pdfUrl?: string;
}

export interface Carrera {
  id: number;
  nombre: string;
  logo: string;
  descripcion: string;
}

export interface NavLink {
  label: string;
  path?: string;
  children?: NavLink[];
}
