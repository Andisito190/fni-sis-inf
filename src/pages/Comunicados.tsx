import { useEffect, useState } from 'react';
import PageHero from '../components/common/PageHero';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import { getComunicados } from '../services/api';
import type { Comunicado } from '../types';

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  useEffect(() => {
    getComunicados().then(setComunicados);
  }, []);

  return (
    <>
      <PageHero
        title="Comunicados"
        subtitle="Noticias y comunicados oficiales de la facultad"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Comunicados' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comunicados.map((comunicado) => (
            <AnnouncementCard key={comunicado.id} comunicado={comunicado} />
          ))}
        </div>
        {comunicados.length === 0 && (
          <p className="text-center text-[#6B7280] py-12">No hay comunicados recientes.</p>
        )}
      </div>
    </>
  );
}
