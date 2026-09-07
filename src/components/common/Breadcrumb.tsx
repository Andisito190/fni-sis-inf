import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Navegación de migas de pan"
      className="bg-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              )}
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-[#6B7280] hover:text-[#0B3558] transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#1F2937] font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
