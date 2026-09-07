import type { PersonaAcademica } from '../../types';

export const auxiliaresMock: PersonaAcademica[] = [
  {
    id: 1,
    nombre: 'Anóver',
    apellido: 'Silva Brayan Cristopher',
    correo: 'anover.silva@uto.edu.bo',
    telefono: '76123456',
    foto: '',
    materias: [
      { nombre: 'Ingeniería de Sistemas I', sigla: 'SIS 3620', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 2,
    nombre: 'María Elena',
    apellido: 'Garcia Lopez',
    correo: 'maria.garcia@uto.edu.bo',
    telefono: '76543210',
    foto: '',
    materias: [
      { nombre: 'Base de Datos I', sigla: 'SIS 3614', paralelo: 'B', gestion: 'II/2026' },
    ],
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'Mamani Quispe',
    correo: 'carlos.mamani@uto.edu.bo',
    telefono: '76987654',
    foto: '',
    materias: [
      { nombre: 'Redes de Computadoras I', sigla: 'SIS 3616', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 4,
    nombre: 'Ana Lucía',
    apellido: 'Torres Vargas',
    correo: 'ana.torres@uto.edu.bo',
    telefono: '76345678',
    foto: '',
    materias: [
      { nombre: 'Programación Web', sigla: 'SIS 3622', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
  {
    id: 5,
    nombre: 'Luis',
    apellido: 'Huanca Flores',
    correo: 'luis.huanca@uto.edu.bo',
    telefono: '76876543',
    foto: '',
    materias: [
      { nombre: 'Ingeniería de Software I', sigla: 'SIS 3618', paralelo: 'C', gestion: 'II/2026' },
    ],
  },
  {
    id: 6,
    nombre: 'Patricia',
    apellido: 'Rojas Mendez',
    correo: 'patricia.rojas@uto.edu.bo',
    telefono: '76234567',
    foto: '',
    materias: [
      { nombre: 'Sistemas Operativos I', sigla: 'SIS 3617', paralelo: 'A', gestion: 'II/2026' },
    ],
  },
];
