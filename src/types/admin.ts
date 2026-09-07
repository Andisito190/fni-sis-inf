export interface Usuario {
  idUsuario: number;
  nombreU: string;
  estado: boolean;
  idRol: number;
  rol: { nombreRol: string };
}

export interface Comunicado {
  idComunicado: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: string;
  fechaVencimiento: string | null;
  archivo: string | null;
  imagen: string | null;
  estado: boolean;
  idUsuario: number;
  usuario?: { nombreU: string };
}

export interface Evento {
  idEvento: number;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
  lugar: string | null;
  imagen: string | null;
  estado: boolean;
  idUsuario: number;
  usuario?: { nombreU: string };
}

export interface Docente {
  idDocente: number;
  nombre: string;
  apellido: string;
  correo: string | null;
  telefono: string | null;
  foto: string | null;
  estado: boolean;
  materias?: DocenteMateria[];
}

export interface Auxiliar {
  idAuxiliar: number;
  nombre: string;
  apellido: string;
  correo: string | null;
  telefono: string | null;
  foto: string | null;
  estado: boolean;
  materias?: AuxiliarMateria[];
}

export interface Materia {
  idMateria: number;
  nombreM: string;
  siglaM: string;
  descripcion: string;
}

export interface DocenteMateria {
  idDocenteMateria: number;
  idDocente: number;
  idMateria: number;
  paralelo: string;
  gestion: string;
  materia: Materia;
}

export interface AuxiliarMateria {
  idAuxiliarMateria: number;
  idAuxiliar: number;
  idMateria: number;
  paralelo: string;
  gestion: string;
  materia: Materia;
}

export interface Rol {
  idRol: number;
  nombreRol: string;
}

export interface LoginPayload {
  nombre_u: string;
  contrasenia: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    rol: string;
  };
}
