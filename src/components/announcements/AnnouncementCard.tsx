import { Link } from 'react-router-dom';
import { Calendar, FileText } from 'lucide-react';
import type { Comunicado } from '../../types';

interface AnnouncementCardProps {
  comunicado: Comunicado;
}

export default function AnnouncementCard({ comunicado }: AnnouncementCardProps) {
  const fechaFormateada = new Date(comunicado.fecha).toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(11,53,88,0.08)] hover:-translate-y-1 transition-all duration-300 group">
      <div className="h-52 bg-gray-100 overflow-hidden relative">
        <img
          src={comunicado.imagen}
          alt={comunicado.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3558]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
          <Calendar className="w-4 h-4 text-[#B8202E] flex-shrink-0" />
          <span>{fechaFormateada}</span>
        </div>
        <h3 className="text-lg font-bold text-[#0B3558] mb-3 leading-tight group-hover:text-[#0C5C8C] transition-colors duration-200">
          {comunicado.titulo}
        </h3>
        <p className="text-sm text-[#6B7280] mb-5 line-clamp-3 leading-relaxed">{comunicado.resumen}</p>
        <div className="flex flex-wrap gap-2.5">
          <Link
            to={`/comunicados/${comunicado.id}`}
            className="inline-flex items-center px-5 py-2.5 bg-[#0B3558] text-white text-sm font-medium rounded-xl hover:bg-[#0C5C8C] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Ver comunicado
          </Link>
          {comunicado.pdfUrl && (
            <a
              href={comunicado.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0B3558]/20 text-[#0B3558] text-sm font-medium rounded-xl hover:bg-[#EAF4FA] transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              Descargar
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
