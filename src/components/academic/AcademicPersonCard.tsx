import { useState } from 'react';
import { Mail, Phone, BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type { PersonaAcademica } from '../../types';

interface AcademicPersonCardProps {
  persona: PersonaAcademica;
}

export default function AcademicPersonCard({ persona }: AcademicPersonCardProps) {
  const initials = `${persona.nombre.charAt(0)}${persona.apellido.charAt(0)}`;
  const [showMaterias, setShowMaterias] = useState(true);

  return (
    <div className="relative bg-white rounded-2xl overflow-visible group
      border border-gray-100
      shadow-[0_2px_20px_rgba(11,53,88,0.04)]
      hover:shadow-[0_20px_60px_rgba(11,53,88,0.15)]
      hover:-translate-y-3
      transition-all duration-500 ease-out">

      {/* Left accent bar that grows on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B8202E] via-[#1684B8] to-[#0B3558]
        rounded-l-2xl
        scale-y-0 group-hover:scale-y-100
        transition-transform duration-500 ease-out origin-top" />

      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#0B3558] via-[#1684B8] to-[#B8202E]
        w-0 group-hover:w-full transition-all duration-700 ease-out" />

      {/* Background mesh pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03]
        transition-opacity duration-500
        bg-[radial-gradient(circle_at_1px_1px,_#0B3558_1px,_transparent_0)]
        bg-[size:16px_16px]
        pointer-events-none" />

      {/* Floating corner badge */}
      <div className="absolute -top-px -right-px opacity-0 group-hover:opacity-100
        transition-all duration-500 delay-100
        translate-y-2 group-hover:translate-y-0">
        <div className="bg-[#B8202E] text-white text-[9px] font-bold
          px-2 py-0.5 rounded-bl-xl rounded-tr-2xl
          shadow-lg shadow-red-500/20">
          <Sparkles className="w-3 h-3 inline mr-0.5" />
          PERFIL
        </div>
      </div>

      <div className="p-7 pt-8">
        {/* Avatar section */}
        <div className="relative w-[150px] h-[150px] mx-auto mb-6">
          {/* Outer rotating ring */}
          <div className="absolute -inset-3 rounded-full
            border-[1.5px] border-dashed border-[#EAF4FA]
            group-hover:border-[#1684B8]/30
            group-hover:animate-[spin_15s_linear_infinite]
            transition-colors duration-700" />

          {/* Middle pulsing ring */}
          <div className="absolute -inset-1.5 rounded-full
            border-2 border-transparent
            group-hover:border-[#B8202E]/15
            group-hover:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]
            transition-colors duration-500" />

          {/* Inner glow */}
          <div className="absolute -inset-1 rounded-full
            bg-gradient-to-br from-[#0B3558]/0 to-[#B8202E]/0
            group-hover:from-[#0B3558]/15 group-hover:to-[#B8202E]/15
            blur-md
            transition-all duration-700" />

          {persona.foto ? (
            <div className="relative w-full h-full rounded-full overflow-hidden
              ring-[3px] ring-gray-100 group-hover:ring-[#1684B8]/30
              transition-all duration-500">
              <img
                src={persona.foto}
                alt={`${persona.nombre} ${persona.apellido}`}
                className="w-full h-full object-cover
                  group-hover:scale-110
                  transition-transform duration-700 ease-out" />
              {/* Hover overlay with pattern */}
              <div className="absolute inset-0
                bg-gradient-to-t from-[#0B3558]/50 via-[#0B3558]/10 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500" />
            </div>
          ) : (
            <div className="relative w-full h-full rounded-full
              bg-gradient-to-br from-[#0B3558] via-[#0C5C8C] to-[#1684B8]
              flex items-center justify-center
              ring-[3px] ring-gray-100 group-hover:ring-[#1684B8]/30
              transition-all duration-500
              overflow-hidden">
              {/* Animated background shimmer */}
              <div className="absolute inset-0
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                -translate-x-full group-hover:translate-x-full
                transition-transform duration-1000 ease-out" />
              <span className="relative text-white text-3xl font-extrabold tracking-wider
                group-hover:scale-110 group-hover:tracking-widest
                transition-all duration-500">{initials}</span>
            </div>
          )}

          {/* Online dot with ring */}
          <div className="absolute bottom-2 right-2">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white
                animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-400
                animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />
            </div>
          </div>
        </div>

        {/* Name with animated underline */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-extrabold text-[#0B3558] leading-tight mb-0.5
            group-hover:text-[#0C5C8C] transition-colors duration-300">
            {persona.apellido}
          </h3>
          <p className="text-sm font-semibold text-[#0C5C8C]/80 mb-2">
            {persona.nombre}
          </p>
          {/* Animated underline */}
          <div className="w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-[#B8202E] to-[#1684B8]
            mx-auto rounded-full transition-all duration-500 ease-out" />
        </div>

        {/* Title / Specialty badges */}
        {(persona.titulo || persona.especialidad) && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {persona.titulo && (
              <span className="text-[10px] font-semibold uppercase tracking-wider
                px-2.5 py-1 rounded-full
                bg-[#EAF4FA] text-[#0B3558]
                border border-[#0B3558]/10
                hover:bg-[#0B3558] hover:text-white
                hover:border-[#0B3558]
                cursor-default
                transition-all duration-300">
                {persona.titulo}
              </span>
            )}
            {persona.especialidad && (
              <span className="text-[10px] font-semibold uppercase tracking-wider
                px-2.5 py-1 rounded-full
                bg-[#FCECEE] text-[#B8202E]
                border border-[#B8202E]/10
                hover:bg-[#B8202E] hover:text-white
                hover:border-[#B8202E]
                cursor-default
                transition-all duration-300">
                {persona.especialidad}
              </span>
            )}
          </div>
        )}

        {/* Materias accordion */}
        {persona.materias.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setShowMaterias(!showMaterias)}
              className="w-full flex items-center justify-between
                px-3 py-2.5 rounded-xl
                bg-gray-50 hover:bg-[#EAF4FA]
                transition-all duration-300
                text-xs font-semibold text-[#0B3558] uppercase tracking-wider
                group/btn"
            >
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0B3558]/10 flex items-center justify-center
                  group-hover/btn:bg-[#0B3558] transition-colors duration-300">
                  <BookOpen className="w-3 h-3 text-[#0B3558] group-hover/btn:text-white transition-colors duration-300" />
                </div>
                Materias
                <span className="ml-1 bg-[#B8202E] text-white text-[9px] font-bold
                  w-5 h-5 rounded-full flex items-center justify-center
                  group-hover/btn:scale-110 transition-transform duration-200">
                  {persona.materias.length}
                </span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showMaterias ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-out
              ${showMaterias ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
              <div className="space-y-1.5">
                {persona.materias.map((m, i) => (
                  <div key={i}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                      bg-white border border-gray-100
                      hover:border-[#1684B8]/20 hover:bg-[#EAF4FA]/30
                      hover:shadow-sm
                      transition-all duration-300
                      hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                    <div className="w-6 h-6 rounded-lg bg-[#1684B8]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-[#1684B8]">{m.sigla.slice(0,2)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1F2937] truncate">{m.nombre}</p>
                      <p className="text-[10px] text-[#6B7280]">
                        <span className="font-medium text-[#1684B8]">{m.sigla}</span> · Par. {m.paralelo} · {m.gestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact bar */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100">
          <a
            href={`tel:+591${persona.telefono}`}
            aria-label="Llamar por teléfono"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
              bg-[#EAF4FA] text-[#0B3558]
              hover:bg-[#0B3558] hover:text-white
              hover:shadow-lg hover:shadow-[#0B3558]/20
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              text-xs font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Llamar</span>
          </a>
          <a
            href={`mailto:${persona.correo}`}
            aria-label="Enviar correo electrónico"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
              bg-[#FCECEE] text-[#B8202E]
              hover:bg-[#B8202E] hover:text-white
              hover:shadow-lg hover:shadow-[#B8202E]/20
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              text-xs font-semibold"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Correo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
