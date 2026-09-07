import PageHero from '../components/common/PageHero';
import { Monitor, Server, Wifi } from 'lucide-react';

const laboratorios = [
  {
    nombre: 'Laboratorio de Ingeniería de Sistemas',
    descripcion: 'Equipado con estaciones de trabajo de alto rendimiento para desarrollo de software, inteligencia artificial y ciencia de datos.',
    icono: Monitor,
  },
  {
    nombre: 'Laboratorio de Redes y Telecomunicaciones',
    descripcion: 'Espacio dedicado al estudio de redes de computadoras, seguridad informática y telecomunicaciones.',
    icono: Wifi,
  },
  {
    nombre: 'Laboratorio de Servidores',
    descripcion: 'Infraestructura de servidores para prácticas de administración de sistemas, virtualización y computación en la nube.',
    icono: Server,
  },
];

export default function Laboratorios() {
  return (
    <>
      <PageHero
        title="Laboratorios"
        subtitle="Espacios equipados para la práctica y el aprendizaje"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Laboratorios' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratorios.map((lab, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-[0_8px_30px_rgba(11,53,88,0.08)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF4FA] group-hover:bg-[#0B3558] flex items-center justify-center mb-5 transition-colors duration-200">
                <lab.icono className="w-6 h-6 text-[#0B3558] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-bold text-[#0B3558] mb-2">{lab.nombre}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{lab.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
