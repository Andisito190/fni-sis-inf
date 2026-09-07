import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  breadcrumbs: { label: string; path?: string }[];
}

export default function PageHero({ title, subtitle, bgImage, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative h-[280px] sm:h-[360px] lg:h-[400px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {bgImage && (
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3558] via-[#0C5C8C] to-[#1684B8]" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Mesh pattern */}
      <div className="absolute inset-0 opacity-[0.04]
        bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)]
        bg-[size:20px_20px]" />

      {/* Content — pushed down to clear the fixed navbar */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-20 pt-20 sm:pt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-4 animate-fade-in">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {item.path ? (
                <Link to={item.path} className="hover:text-white/80 transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/80 font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-2 animate-fade-in-up">
          {title}
        </h1>

        {subtitle && (
          <p className="text-base sm:text-lg text-white/60 max-w-xl animate-fade-in-up delay-100">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F6F7] to-transparent" />
    </section>
  );
}
