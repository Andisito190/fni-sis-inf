import { Link } from 'react-router-dom';
import { Shield, Code, Server, ArrowRight, Wifi, Lock, BarChart3, Globe, Lightbulb } from 'lucide-react';

const careers = [
  {
    id: 'sistemas',
    title: 'Ingeniería de Sistemas',
    subtitle: 'Diseña soluciones tecnológicas',
    description: 'No es solo programación ni ensamblaje de computadoras. El Ingeniero de Sistemas diseña y desarrolla sistemas de información: desde una intranet universitaria, el portal web de un banco, un sistema contable empresarial hasta aplicaciones móviles. Se apoya en las matemáticas, la lógica y la investigación.',
    color: '#B8202E',
    colorDark: '#8F1825',
    gradient: 'from-[#B8202E] via-[#8F1825] to-[#6B1420]',
    bgPattern: 'bg-[#B8202E]',
    logo: '/images/carreras/sistemas.png',
    areas: [
      { icon: Code, label: 'Desarrollo de Software' },
      { icon: Lightbulb, label: 'Análisis y Diseño de Sistemas' },
      { icon: Globe, label: 'Aplicaciones Web y Móviles' },
      { icon: BarChart3, label: 'Gestión de Proyectos TI' },
    ],
    path: '/docentes',
  },
  {
    id: 'informatica',
    title: 'Ingeniería Informática',
    subtitle: 'Conecta el mundo',
    description: 'Especializada en redes, telecomunicaciones e infraestructura tecnológica. Garantiza la conectividad, el flujo seguro de información y la seguridad de los datos. Es la columna vertebral de toda organización que depende de la tecnología.',
    color: '#0C5C8C',
    colorDark: '#0B3558',
    gradient: 'from-[#0C5C8C] via-[#0B3558] to-[#082A45]',
    bgPattern: 'bg-[#0C5C8C]',
    logo: '/images/carreras/informatica.png',
    areas: [
      { icon: Wifi, label: 'Redes y Telecomunicaciones' },
      { icon: Lock, label: 'Ciberseguridad' },
      { icon: Server, label: 'Infraestructura TI' },
      { icon: Shield, label: 'Seguridad de la Información' },
    ],
    path: '/docentes',
  },
];

export default function CareerShowcase() {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#B8202E] text-sm font-bold tracking-widest uppercase mb-3">
          Explora nuestras carreras
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3558] mb-4">
          ¿Qué es la Ingeniería?
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#B8202E] to-[#0C5C8C] rounded-full mx-auto" />
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {careers.map((career, idx) => (
            <Link
              key={career.id}
              to={career.path}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${career.gradient} text-white
                transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${career.id === 'sistemas' ? 'red' : 'blue'}-900/30
                animate-fade-in-up ${idx === 1 ? 'delay-200' : ''}`}
            >
              {/* Background mesh pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4" />
                <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                {/* Top section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 overflow-hidden
                      group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img src={career.logo} alt={career.title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight">
                        {career.title}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm font-medium mt-1 italic">
                        {career.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center
                    group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-lg">
                  {career.description}
                </p>

                {/* Area tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {career.areas.map((area, i) => {
                    const AreaIcon = area.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-sm
                          border border-white/10 text-white/90 text-[11px] sm:text-xs font-medium
                          group-hover:bg-white/20 group-hover:border-white/20
                          transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <AreaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {area.label}
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-xs sm:text-sm font-bold rounded-xl
                    transition-all duration-300 group-hover:shadow-lg"
                    style={{ color: career.color }}
                  >
                    CONOCER MÁS
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-500" />
            </Link>
        ))}
      </div>
    </section>
  );
}
