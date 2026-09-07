import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DropdownMenu from '../common/DropdownMenu';
import type { NavLink } from '../../types';

const navLinks: NavLink[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
  {
    label: 'Eventos',
    children: [
      { label: 'Próximos eventos', path: '/eventos' },
      { label: 'Eventos anteriores', path: '/eventos' },
    ],
  },
  {
    label: 'Equipo académico',
    children: [
      { label: 'Plantel Docente', path: '/docentes' },
      { label: 'Auxiliares', path: '/auxiliares' },
    ],
  },
  {
    label: 'Servicios',
    children: [
      { label: 'Moodle UTO', path: 'https://moodle.uto.edu.bo' },
      { label: 'Moodle SIS-INF', path: 'https://moodle.sis-inf.edu.bo' },
    ],
  },
  { label: 'Laboratorios', path: '/laboratorios' },
  { label: 'Comunicados', path: '/comunicados' },
  { label: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isTransparent = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 ${
              isTransparent
                ? 'bg-white/15 backdrop-blur-sm border border-white/20'
                : 'bg-gradient-to-br from-[#0B3558] to-[#0C5C8C]'
            }`}>
              <span className="font-bold text-sm tracking-wide text-white">SIS</span>
            </div>
            <div className="hidden sm:block">
              <p className={`text-sm font-bold leading-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-[#0B3558]'
              }`}>Ing. de Sistemas</p>
              <p className={`text-[11px] font-medium tracking-wide transition-colors duration-300 ${
                isTransparent ? 'text-white/70' : 'text-[#6B7280]'
              }`}>e Ing. Informática</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Menú principal">
            {navLinks.map((link, i) =>
              link.children ? (
                <DropdownMenu key={i} item={link} transparent={isTransparent} />
              ) : (
                <Link
                  key={i}
                  to={link.path || '#'}
                  className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? isTransparent
                        ? 'text-white bg-white/15'
                        : 'text-[#0B3558] bg-[#EAF4FA]'
                      : isTransparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#4B5563] hover:text-[#0B3558] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full transition-colors duration-300 ${
                      isTransparent ? 'bg-white' : 'bg-[#0B3558]'
                    }`} />
                  )}
                </Link>
              )
            )}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-[#4B5563] hover:text-[#0B3558] hover:bg-gray-50'
            }`}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={`lg:hidden border-t animate-slide-down ${
          isTransparent
            ? 'bg-[#0B3558]/95 backdrop-blur-md border-white/10'
            : 'bg-white border-gray-100'
        }`}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link, i) =>
              link.children ? (
                <div key={i}>
                  <button
                    onClick={() => toggleDropdown(i)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isTransparent
                        ? 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-[#4B5563] hover:bg-[#EAF4FA] hover:text-[#0B3558]'
                    }`}
                    aria-expanded={openDropdowns.has(i)}
                  >
                    {link.label}
                    <ChevronIcon open={openDropdowns.has(i)} />
                  </button>
                  {openDropdowns.has(i) && (
                    <div className="pl-4 space-y-0.5 animate-slide-down">
                      {link.children.map((child, j) =>
                        child.path?.startsWith('http') ? (
                          <a
                            key={j}
                            href={child.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                              isTransparent
                                ? 'text-white/60 hover:text-white hover:bg-white/10'
                                : 'text-[#6B7280] hover:text-[#0B3558] hover:bg-[#EAF4FA]'
                            }`}
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={j}
                            to={child.path || '#'}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                              isTransparent
                                ? 'text-white/60 hover:text-white hover:bg-white/10'
                                : 'text-[#6B7280] hover:text-[#0B3558] hover:bg-[#EAF4FA]'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  to={link.path || '#'}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === link.path
                      ? isTransparent
                        ? 'text-white bg-white/15'
                        : 'text-[#0B3558] bg-[#EAF4FA]'
                      : isTransparent
                        ? 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-[#4B5563] hover:bg-gray-50 hover:text-[#0B3558]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
