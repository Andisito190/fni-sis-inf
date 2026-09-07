import { useEffect, useState } from 'react';
import PageHero from '../components/common/PageHero';
import EventCard from '../components/events/EventCard';
import { getEventos } from '../services/api';
import type { Evento } from '../types';

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    getEventos().then(setEventos);
  }, []);

  return (
    <>
      <PageHero
        title="Eventos"
        subtitle="Próximas actividades y eventos académicos"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Eventos' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
        {eventos.length === 0 && (
          <p className="text-center text-[#6B7280] py-12">No hay eventos programados.</p>
        )}
      </div>
    </>
  );
}
