import type { Comunicado } from '../../types';

export const comunicadosMock: Comunicado[] = [
  {
    id: 1,
    titulo: 'Inscripciones Abiertas Semestre II/2026',
    imagen: '/images/comunicados/comunicado1.jpg',
    fecha: '2026-08-15',
    resumen: 'Se informa que las inscripciones para el semestre II/2026 se encuentran abiertas hasta el 30 de agosto.',
    contenido: 'La Facultad Nacional de Ingeniería informa que el periodo de inscripciones para el semestre II/2026 se encuentra abierto. Los interesados podrán realizar sus inscripciones en las oficinas administrativas de la facultad en el horario de 8:00 a 12:00 y de 14:00 a 18:00.',
    pdfUrl: '#',
  },
  {
    id: 2,
    titulo: 'Resultados Parciales Primer Semestre 2026',
    imagen: '/images/comunicados/comunicado2.jpg',
    fecha: '2026-07-10',
    resumen: 'Se publican los resultados parciales del primer semestre 2026 para las carreras de Ingeniería.',
    contenido: 'Se informa a la comunidad universitaria que los resultados parciales del primer semestre 2026 ya se encuentran disponibles en el portal académico.',
    pdfUrl: '#',
  },
  {
    id: 3,
    titulo: 'Convocatoria para Docentes de Plantilla',
    imagen: '/images/comunicados/comunicado3.jpg',
    fecha: '2026-06-20',
    resumen: 'La FNI convoca a profesionales interesados en incorporarse como docentes de planta.',
    contenido: 'La Facultad Nacional de Ingeniería convoca a profesionales con experiencia en las áreas de ingeniería de sistemas e informática para incorporarse como docentes de planta.',
    pdfUrl: '#',
  },
  {
    id: 4,
    titulo: 'Feria de Empleo y Pasantías 2026',
    imagen: '/images/comunicados/comunicado4.jpg',
    fecha: '2026-09-01',
    resumen: 'Se realizará la feria de empleo y pasantías para estudiantes y egresados de la facultad.',
    contenido: 'La Facultad Nacional de Ingeniería organiza la Feria de Empleo y Pasantías 2026, donde empresas del sector tecnológico ofrecerán oportunidades laborales y de pasantías.',
  },
];
