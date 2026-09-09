import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, FileText } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { getComunicadoById } from '../services/api';
import type { Comunicado } from '../types';

export default function ComunicadoDetalle() {
  const { id } = useParams();
  const [comunicado, setComunicado] = useState<Comunicado | null>(null);

  useEffect(() => {
    if (id) {
      getComunicadoById(Number(id)).then((c) => setComunicado(c ?? null));
    }
  }, [id]);

  if (!comunicado) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Cargando...
      </div>
    );
  }

  const fechaFormateada = new Date(comunicado.fecha).toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <PageHero
        title={comunicado.titulo}
        bgImage={comunicado.imagen}
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Comunicados', path: '/comunicados' },
          { label: comunicado.titulo },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/comunicados"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0B3558] hover:text-[#1684B8] transition-colors duration-150 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a comunicados
        </Link>
        <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-64 sm:h-80 bg-gray-200">
            <img
              src={comunicado.imagen}
              alt={comunicado.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
              <Calendar className="w-4 h-4 text-[#B8202E]" />
              <span>{fechaFormateada}</span>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-[#374151] leading-relaxed whitespace-pre-line">
                {comunicado.contenido || comunicado.resumen}
              </p>
            </div>
            {comunicado.pdfUrl && (
              <div className="mt-6">
                <a
                  href={comunicado.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8202E] text-white text-sm font-semibold rounded-xl hover:bg-[#8F1825] transition-colors duration-150"
                >
                  <FileText className="w-4 h-4" />
                  Descargar documento
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
