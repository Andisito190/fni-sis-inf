import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { getMaterias } from '../../services/api';
import type { Materia } from '../../types';

const accentColors = [
  'border-l-[#B8202E]',
  'border-l-[#0C5C8C]',
  'border-l-[#0B3558]',
  'border-l-[#1684B8]',
  'border-l-[#8F1825]',
  'border-l-[#0C5C8C]',
  'border-l-[#B8202E]',
  'border-l-[#0B3558]',
];

const bgColors = [
  'bg-[#B8202E]/5',
  'bg-[#0C5C8C]/5',
  'bg-[#0B3558]/5',
  'bg-[#1684B8]/5',
  'bg-[#8F1825]/5',
  'bg-[#0C5C8C]/5',
  'bg-[#B8202E]/5',
  'bg-[#0B3558]/5',
];

const textColors = [
  'text-[#B8202E]',
  'text-[#0C5C8C]',
  'text-[#0B3558]',
  'text-[#1684B8]',
  'text-[#8F1825]',
  'text-[#0C5C8C]',
  'text-[#B8202E]',
  'text-[#0B3558]',
];

export default function MateriasSection() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    getMaterias().then(setMaterias);
  }, []);

  if (materias.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <p className="text-[#B8202E] text-sm font-bold tracking-widest uppercase mb-3">
            Plan de estudios
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3558] mb-4">
            Materias Registradas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B8202E] to-[#0C5C8C] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-sm">Aún no hay materias registradas en el sistema.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#B8202E] text-sm font-bold tracking-widest uppercase mb-3">
          Plan de estudios
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3558] mb-4">
          Materias Registradas
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#B8202E] to-[#0C5C8C] rounded-full mx-auto" />
      </div>

      {/* Materias list - desplegado */}
      <div className="max-w-4xl mx-auto space-y-3">
        {materias.map((m, i) => (
          <div
            key={m.id}
            className={`group relative bg-white rounded-2xl border border-gray-100 border-l-4 ${accentColors[i % accentColors.length]}
              overflow-hidden
              hover:shadow-lg hover:shadow-blue-50 hover:border-gray-200
              transition-all duration-300 animate-fade-in-up`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5">
              {/* Number circle */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bgColors[i % bgColors.length]} flex items-center justify-center flex-shrink-0
                group-hover:scale-110 transition-all duration-300`}>
                <span className={`text-sm sm:text-base font-extrabold ${textColors[i % textColors.length]}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#0B3558]/10 text-[#0B3558] text-[10px] sm:text-xs font-mono font-bold w-fit">
                    <BookOpen className="w-3 h-3" />
                    {m.sigla}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#1F2937] leading-snug">
                    {m.nombre}
                  </h3>
                </div>
                {m.descripcion && (
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5 line-clamp-2">
                    {m.descripcion}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-gray-50 items-center justify-center flex-shrink-0
                group-hover:bg-[#0B3558] group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 text-gray-300 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
