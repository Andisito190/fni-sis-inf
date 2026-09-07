import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B3558] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SIS</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Facultad Nacional</p>
                <p className="text-[11px] text-white/50">de Ingeniería</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Formando ingenieros con conocimientos sólidos y compromiso social para el desarrollo
              del país.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-wider">Enlaces rápidos</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', path: '/' },
                { label: 'Comunicados', path: '/comunicados' },
                { label: 'Eventos', path: '/eventos' },
                { label: 'Contacto', path: '/contacto' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-wider">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 flex-shrink-0 text-[#B8202E]" />
                <span>Cochabamba, Bolivia</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#B8202E]" />
                <span>(591) 4-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#B8202E]" />
                <span>info@fni.edu.bo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-7 text-center">
          <p className="text-sm text-white/40">
            &copy; 2026 Facultad Nacional de Ingeniería — Universidad Técnica de Oruro. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
