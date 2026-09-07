import { useState, useEffect } from 'react';
import { Users, FileText, Calendar, GraduationCap, UserCheck } from 'lucide-react';
import { adminGetUsuarios, adminGetComunicados, adminGetEventos, adminGetDocentes, adminGetAuxiliares } from '../../services/admin';

interface Stats {
  usuarios: number;
  comunicados: number;
  eventos: number;
  docentes: number;
  auxiliares: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ usuarios: 0, comunicados: 0, eventos: 0, docentes: 0, auxiliares: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [u, c, e, d, a] = await Promise.all([
          adminGetUsuarios(),
          adminGetComunicados(),
          adminGetEventos(),
          adminGetDocentes(),
          adminGetAuxiliares(),
        ]);
        setStats({
          usuarios: u.length,
          comunicados: c.length,
          eventos: e.length,
          docentes: d.length,
          auxiliares: a.length,
        });
      } catch {
        // stats stay at 0
      }
    };
    load();
  }, []);

  const cards = [
    { label: 'Usuarios', value: stats.usuarios, icon: Users, color: 'bg-[#0B3558]' },
    { label: 'Comunicados', value: stats.comunicados, icon: FileText, color: 'bg-[#0C5C8C]' },
    { label: 'Eventos', value: stats.eventos, icon: Calendar, color: 'bg-[#1684B8]' },
    { label: 'Docentes', value: stats.docentes, icon: GraduationCap, color: 'bg-emerald-600' },
    { label: 'Auxiliares', value: stats.auxiliares, icon: UserCheck, color: 'bg-[#B8202E]' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#0B3558] mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-[#6B7280]">{card.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-[#1F2937]">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
