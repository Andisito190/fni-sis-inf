import { useEffect, useState } from 'react';
import PageHero from '../components/common/PageHero';
import AcademicPersonCard from '../components/academic/AcademicPersonCard';
import { getAuxiliares } from '../services/api';
import type { PersonaAcademica } from '../types';

export default function Auxiliares() {
  const [auxiliares, setAuxiliares] = useState<PersonaAcademica[]>([]);

  useEffect(() => {
    getAuxiliares().then(setAuxiliares);
  }, []);

  return (
    <>
      <PageHero
        title="Auxiliares"
        subtitle="Semestre II/2026 — Equipo de auxiliares académicos"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Auxiliares' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auxiliares.map((auxiliar) => (
            <AcademicPersonCard key={auxiliar.id} persona={auxiliar} />
          ))}
        </div>
        {auxiliares.length === 0 && (
          <p className="text-center text-[#6B7280] py-12">No hay auxiliares registrados.</p>
        )}
      </div>
    </>
  );
}
