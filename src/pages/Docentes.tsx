import { useEffect, useState } from 'react';
import PageHero from '../components/common/PageHero';
import AcademicPersonCard from '../components/academic/AcademicPersonCard';
import { getDocentes } from '../services/api';
import type { PersonaAcademica } from '../types';

export default function Docentes() {
  const [docentes, setDocentes] = useState<PersonaAcademica[]>([]);

  useEffect(() => {
    getDocentes().then(setDocentes);
  }, []);

  return (
    <>
      <PageHero
        title="Plantel Docente"
        subtitle="Profionales comprometidos con la formación de ingenieros"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Plantel Docente' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docentes.map((docente) => (
            <AcademicPersonCard key={docente.id} persona={docente} />
          ))}
        </div>
        {docentes.length === 0 && (
          <p className="text-center text-[#6B7280] py-12">No hay docentes registrados.</p>
        )}
      </div>
    </>
  );
}
