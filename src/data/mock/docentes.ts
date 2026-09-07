import type { PersonaAcademica } from '../../types';

export const docentesMock: PersonaAcademica[] = [
  {
    id: 1,
    nombre: 'Dr. Fernando',
    apellido: 'Mendoza Bustos',
    correo: 'fernando.mendoza@uto.edu.bo',
    telefono: '71234567',
    foto: '',
    titulo: 'Doctor en Ciencias de la Computación',
    especialidad: 'Inteligencia Artificial',
    materias: [
      { nombre: 'Inteligencia Artificial', sigla: 'SIS 4610', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 2,
    nombre: 'Ing. Sandra',
    apellido: 'Perez Castillo',
    correo: 'sandra.perez@uto.edu.bo',
    telefono: '71345678',
    foto: '',
    titulo: 'Magíster en Ingeniería de Sistemas',
    especialidad: 'Ingeniería de Software',
    materias: [
      { nombre: 'Ingeniería de Software II', sigla: 'SIS 4612', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 3,
    nombre: 'Ing. Roberto',
    apellido: 'Vargas Limachi',
    correo: 'roberto.vargas@uto.edu.bo',
    telefono: '71456789',
    foto: '',
    titulo: 'Magíster en Ciencias de la Computación',
    especialidad: 'Redes y Seguridad',
    materias: [
      { nombre: 'Redes de Computadoras II', sigla: 'SIS 4614', paralelo: 'B', gestion: 'II/2026' },
    ],
  },
  {
    id: 4,
    nombre: 'Ing. Claudia',
    apellido: 'Mamani Torrez',
    correo: 'claudia.mamani@uto.edu.bo',
    telefono: '71567890',
    foto: '',
    titulo: 'Magíster en Informática',
    especialidad: 'Base de Datos',
    materias: [
      { nombre: 'Base de Datos II', sigla: 'SIS 4616', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 5,
    nombre: 'Ing. Jorge',
    apellido: 'Condori Huanca',
    correo: 'jorge.condori@uto.edu.bo',
    telefono: '71678901',
    foto: '',
    titulo: 'Magíster en Ingeniería de Sistemas',
    especialidad: 'Desarrollo Web',
    materias: [
      { nombre: 'Programación Web Avanzada', sigla: 'SIS 4618', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 6,
    nombre: 'Ing. Elena',
    apellido: 'Quispe Flores',
    correo: 'elena.quispe@uto.edu.bo',
    telefono: '71789012',
    foto: '',
    titulo: 'Doctora en Informática',
    especialidad: 'Computación en la Nube',
    materias: [
      { nombre: 'Cloud Computing', sigla: 'SIS 4620', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
];
