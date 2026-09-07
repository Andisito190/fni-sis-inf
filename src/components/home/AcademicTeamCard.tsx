import { Link } from 'react-router-dom';
import { Users, User } from 'lucide-react';

export default function AcademicTeamCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#0B3558] mb-4 uppercase tracking-wide">Equipo Académico</h3>
      <div className="space-y-2.5">
        <Link
          to="/docentes"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-[#0B3558]/20 hover:bg-[#EAF4FA] transition-all duration-200 text-[#4B5563] hover:text-[#0B3558] group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#EAF4FA] group-hover:bg-[#0B3558] flex items-center justify-center transition-colors duration-200">
            <Users className="w-4 h-4 text-[#0B3558] group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-medium text-sm">Docentes</span>
        </Link>
        <Link
          to="/auxiliares"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-[#0B3558]/20 hover:bg-[#EAF4FA] transition-all duration-200 text-[#4B5563] hover:text-[#0B3558] group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#EAF4FA] group-hover:bg-[#0B3558] flex items-center justify-center transition-colors duration-200">
            <User className="w-4 h-4 text-[#0B3558] group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-medium text-sm">Auxiliares</span>
        </Link>
      </div>
    </div>
  );
}
