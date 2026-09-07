import type { Evento } from '../../types';

export const eventosMock: Evento[] = [
  {
    id: 1,
    titulo: 'Congreso Nacional de Ingeniería de Sistemas 2026',
    imagen: '/images/eventos/evento1.jpg',
    fecha: '2026-10-15',
    hora: '08:00',
    lugar: 'Auditorio Principal - FNI',
    descripcion: 'Evento académico que reúne a profesionales e investigadores del área de ingeniería de sistemas.',
    contenido: 'El Congreso Nacional de Ingeniería de Sistemas 2026 será un espacio de encuentro académico donde profesionales, investigadores y estudiantes compartirán conocimientos sobre las últimas tendencias en tecnología e ingeniería de sistemas.',
  },
  {
    id: 2,
    titulo: 'Taller de Desarrollo Web con React y Node.js',
    imagen: '/images/eventos/evento2.jpg',
    fecha: '2026-09-20',
    hora: '14:00',
    lugar: 'Laboratorio de Sistemas - FNI',
    descripcion: 'Taller práctico para estudiantes de ingeniería sobre desarrollo web moderno.',
    contenido: 'Este taller cubrirá los fundamentos de React.js y Node.js para el desarrollo de aplicaciones web modernas.',
  },
  {
    id: 3,
    titulo: 'Jornada de Puertas Abiertas 2026',
    imagen: '/images/eventos/evento3.jpg',
    fecha: '2026-11-05',
    hora: '09:00',
    lugar: 'Facultad Nacional de Ingeniería',
    descripcion: 'Conoce nuestras carreras de Ingeniería de Sistemas e Ingeniería Informática.',
    contenido: 'La Jornada de Puertas Abiertas está dirigida a futuros estudiantes que deseen conocer la oferta académica de la Facultad Nacional de Ingeniería.',
  },
  {
    id: 4,
    titulo: 'Seminario de Seguridad Informática',
    imagen: '/images/eventos/evento4.jpg',
    fecha: '2026-10-01',
    hora: '10:00',
    lugar: 'Aula Magna - FNI',
    descripcion: 'Seminario sobre las amenazas actuales y estrategias de protección en el mundo digital.',
    contenido: 'Este seminario abordará temas de ciberseguridad, protección de datos y las mejores prácticas para la seguridad informática en organizaciones.',
  },
];
