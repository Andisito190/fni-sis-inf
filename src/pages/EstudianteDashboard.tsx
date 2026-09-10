import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import { useStudentAuth } from '../hooks/student/useStudentAuth';

export default function EstudianteDashboard() {
  const { student, logout } = useStudentAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      <header className="bg-[#0B3558] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">Portal del Estudiante</h1>
                <p className="text-sm text-white/70">¡Bienvenido, {student?.nombre}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors w-fit"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#1F2937] mb-1">Datos de tu cuenta</h2>
          <p className="text-sm text-[#6B7280] mb-6">
            Esta área está en construcción. Pronto tendrás acceso a notas, horarios y trámites.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <dt className="text-[#6B7280] text-xs font-semibold uppercase tracking-wide mb-1">Correo</dt>
              <dd className="font-semibold text-[#1F2937]">{student?.nombre}</dd>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <dt className="text-[#6B7280] text-xs font-semibold uppercase tracking-wide mb-1">Rol</dt>
              <dd className="font-semibold text-[#1F2937]">{student?.rol}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}