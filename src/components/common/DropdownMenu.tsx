import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { NavLink } from '../../types';

interface DropdownMenuProps {
  item: NavLink;
  transparent?: boolean;
}

export default function DropdownMenu({ item, transparent = false }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg ${
          transparent
            ? 'text-white/80 hover:text-white hover:bg-white/10'
            : 'text-[#4B5563] hover:text-[#0B3558] hover:bg-gray-50'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && item.children && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] min-w-[220px] z-50 animate-slide-down overflow-hidden">
          <div className="py-1.5">
            {item.children.map((child, i) => (
              child.path?.startsWith('http') ? (
                <a
                  key={i}
                  href={child.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-[13px] text-[#4B5563] hover:text-[#0B3558] hover:bg-[#EAF4FA] transition-colors duration-150 mx-1.5 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </a>
              ) : (
                <Link
                  key={i}
                  to={child.path || '#'}
                  className="block px-4 py-2.5 text-[13px] text-[#4B5563] hover:text-[#0B3558] hover:bg-[#EAF4FA] transition-colors duration-150 mx-1.5 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
