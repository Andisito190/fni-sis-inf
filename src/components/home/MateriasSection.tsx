import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { getMaterias } from '../../services/api';
import type { Materia } from '../../types';

const colors = {
  sis: {
    accent: 'border-t-[#0B3558]',
    badgeBg: 'bg-[#0B3558]/10',
    badgeText: 'text-[#0B3558]',
    circleBg: 'bg-[#0B3558]/5',
    circleText: 'text-[#0B3558]',
    back: 'bg-gradient-to-br from-[#0B3558] to-[#1684B8]',
  },
  inf: {
    accent: 'border-t-[#B8202E]',
    badgeBg: 'bg-[#B8202E]/10',
    badgeText: 'text-[#B8202E]',
    circleBg: 'bg-[#B8202E]/5',
    circleText: 'text-[#B8202E]',
    back: 'bg-gradient-to-br from-[#8F1825] to-[#B8202E]',
  },
};

const isSis = (sigla: string) => /^SIS/i.test(sigla.trim());

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
        <div className="w-20 h-1 bg-gradient-to-r from-[#B8202E] to-[#0C5C8C] rounded-full mx-auto mb-6" />

        {/* Leyenda */}
        <div className="flex justify-center gap-4 text-xs font-semibold">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200">
            <span className="w-3 h-3 rounded-full bg-[#0B3558]"></span>
            Ing. de Sistemas (SIS)
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200">
            <span className="w-3 h-3 rounded-full bg-[#B8202E]"></span>
            Ing. Informática (INF)
          </span>
        </div>
      </div>

      {/* Materias grid - tarjetas flip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
        {materias.map((m, i) => {
          const c = isSis(m.sigla) ? colors.sis : colors.inf;
          return (
            <div key={m.id} className="group [perspective:1200px] h-36 animate-fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                {/* Frente */}
                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center gap-3 bg-white rounded-2xl border border-gray-100 border-t-4 ${c.accent} p-5 backface-hidden`}>
                  <div className={`w-11 h-11 rounded-xl ${c.circleBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-sm font-extrabold ${c.circleText}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg ${c.badgeBg} ${c.badgeText} text-[11px] font-mono font-bold mb-1.5`}>
                      <BookOpen className="w-3 h-3" />
                      {m.sigla}
                    </span>
                    <h3 className="text-sm font-bold text-[#1F2937] leading-snug line-clamp-2">
                      {m.nombre}
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">Pasa el cursor / toca para ver la descripción</span>
                </div>

                {/* Reverso - descripción */}
                <div className={`absolute inset-0 [transform:rotateY(180deg)] backface-hidden ${c.back} rounded-2xl p-5 flex flex-col justify-center text-center`}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-2">Descripción</p>
                  <p className="text-sm text-white leading-relaxed line-clamp-6">
                    {m.descripcion || 'Sin descripción disponible.'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
