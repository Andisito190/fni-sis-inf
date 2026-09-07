import { GraduationCap } from 'lucide-react';

export default function ServiceCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#0B3558] mb-4 uppercase tracking-wide">Servicios</h3>
      <div className="space-y-2.5">
        <a
          href="https://moodle.uto.edu.bo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-[#0B3558]/20 hover:bg-[#EAF4FA] transition-all duration-200 text-[#4B5563] hover:text-[#0B3558] group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#EAF4FA] group-hover:bg-[#0B3558] flex items-center justify-center transition-colors duration-200">
            <GraduationCap className="w-4 h-4 text-[#0B3558] group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-medium text-sm">Moodle UTO</span>
        </a>
        <a
          href="https://moodle.sis-inf.edu.bo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-[#0B3558]/20 hover:bg-[#EAF4FA] transition-all duration-200 text-[#4B5563] hover:text-[#0B3558] group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#EAF4FA] group-hover:bg-[#0B3558] flex items-center justify-center transition-colors duration-200">
            <GraduationCap className="w-4 h-4 text-[#0B3558] group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-medium text-sm">Moodle SIS-INF</span>
        </a>
      </div>
    </div>
  );
}
