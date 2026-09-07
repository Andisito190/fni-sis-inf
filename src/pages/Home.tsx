import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Mail, GraduationCap, Beaker, Globe, Users, BookOpen } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import SobreNosotros from '../components/common/SobreNosotros';
import CareerShowcase from '../components/home/CareerShowcase';
import MateriasSection from '../components/home/MateriasSection';
import EventCard from '../components/events/EventCard';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import { getEventos, getComunicados } from '../services/api';
import type { Evento, Comunicado } from '../types';

const menuItems = [
  { label: 'INGENIERÍA DE SISTEMAS', desc: 'Desarrollo de software, bases de datos y más.', path: '/docentes', icon: GraduationCap, color: 'bg-[#B8202E]' },
  { label: 'INGENIERÍA INFORMÁTICA', desc: 'Redes, seguridad informática y telecomunicaciones.', path: '/docentes', icon: Beaker, color: 'bg-[#0C5C8C]' },
  { label: 'DOCENTES', desc: 'Conoce a nuestro plantel docente.', path: '/docentes', icon: Users, color: 'bg-[#1684B8]' },
  { label: 'AUXILIARES', desc: 'Equipo de auxiliares académicos.', path: '/auxiliares', icon: Users, color: 'bg-[#0B3558]' },
  { label: 'EVENTOS', desc: 'Próximos eventos y actividades.', path: '/eventos', icon: Globe, color: 'bg-[#8F1825]' },
  { label: 'COMUNICADOS', desc: 'Noticias y comunicados oficiales.', path: '/comunicados', icon: BookOpen, color: 'bg-[#0C5C8C]' },
];

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  useEffect(() => {
    getEventos().then(setEventos);
    getComunicados().then(setComunicados);
  }, []);

  return (
    <>
      {/* Hero Full-Screen */}
      <section className="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/carreras/sistemas.png"
            alt="Facultad Nacional de Ingeniería"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3558] via-[#0C5C8C] to-[#1684B8]" />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay from right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-10">

            {/* Left: Big text */}
            <div className="flex-1 max-w-2xl pt-20 lg:pt-0 animate-fade-in-up text-center lg:text-left">
              <p className="text-[#B8202E] text-xs sm:text-sm lg:text-base font-semibold italic mb-2 sm:mb-3 tracking-wide">
                #Destacados
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] mb-4 sm:mb-6">
                Ing. de Sistemas
                <span className="block">e Ing. Informática</span>
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-lg leading-relaxed">
                Universidad Técnica de Oruro — Facultad Nacional de Ingeniería
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/comunicados"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-[#B8202E] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#8F1825] transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  MÁS INFORMACIÓN
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right: Menu */}
            <div className="w-full lg:w-[380px] xl:w-[420px] pb-6 lg:pb-0">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden
                animate-fade-in-up delay-200 max-h-[60vh] sm:max-h-none overflow-y-auto">
                {menuItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className={`group/item flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4
                      border-b border-white/5 last:border-b-0
                      hover:bg-white/10
                      transition-all duration-300
                      ${i === 0 ? 'bg-[#B8202E]/80 hover:bg-[#B8202E]/90' : ''}`}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0
                      group-hover/item:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm font-bold tracking-wide ${i === 0 ? 'text-white' : 'text-white'}`}>
                        {item.label}
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover/item:text-white/70 group-hover/item:translate-x-1 transition-all duration-200 flex-shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Bottom CTA */}
              <Link
                to="/docentes"
                className="mt-3 sm:mt-4 flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-[#B8202E] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#8F1825] transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:scale-[1.01]"
              >
                OFERTA ACADÉMICA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F6F7] to-transparent" />
      </section>

      {/* Content sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* ¿Qué es la Ingeniería? */}
        <section className="mb-14 animate-fade-in-up">
          <CareerShowcase />
        </section>

        {/* Materias */}
        <section className="mb-14">
          <MateriasSection />
        </section>

        {/* Sobre Nosotros */}
        <section className="mb-14">
          <SectionTitle title="Sobre Nosotros" />
          <SobreNosotros embedded />
        </section>

        {/* Eventos */}
        <section className="mb-14">
          <SectionTitle title="Últimos Eventos" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventos.slice(0, 2).map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#0B3558]/20 text-[#0B3558] text-sm font-semibold rounded-xl hover:bg-[#0B3558] hover:text-white hover:border-[#0B3558] transition-all duration-200"
            >
              Ver todos los eventos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Comunicados */}
        <section className="mb-14">
          <SectionTitle title="Comunicados Recientes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {comunicados.slice(0, 2).map((comunicado) => (
              <AnnouncementCard key={comunicado.id} comunicado={comunicado} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/comunicados"
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#0B3558]/20 text-[#0B3558] text-sm font-semibold rounded-xl hover:bg-[#0B3558] hover:text-white hover:border-[#0B3558] transition-all duration-200"
            >
              Ver todos los comunicados
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
