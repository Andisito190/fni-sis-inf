import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { getEventoById } from '../services/api';
import type { Evento } from '../types';

export default function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    if (id) {
      getEventoById(Number(id)).then(setEvento);
    }
  }, [id]);

  if (!evento) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Cargando...
      </div>
    );
  }

  const fechaFormateada = new Date(evento.fecha).toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <PageHero
        title={evento.titulo}
        bgImage={evento.imagen}
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Eventos', path: '/eventos' },
          { label: evento.titulo },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/eventos"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0B3558] hover:text-[#1684B8] transition-colors duration-150 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a eventos
        </Link>
        <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-64 sm:h-80 bg-gray-200">
            <img
              src={evento.imagen}
              alt={evento.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-4 text-sm text-[#6B7280] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B8202E]" />
                <span>{fechaFormateada}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8202E]" />
                <span>{evento.hora}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B8202E]" />
                <span>{evento.lugar}</span>
              </div>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-[#374151] leading-relaxed whitespace-pre-line">
                {evento.contenido || evento.descripcion}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
