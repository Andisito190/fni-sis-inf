import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Calendar, GraduationCap, UserCheck, BookOpen, LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { useAdminAuth } from '../hooks/admin/useAdminAuth';

interface SidebarLink {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles: string[];
}

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['ADMINISTRADOR', 'EDITOR', 'SUPERVISOR'] },
  { label: 'Usuarios', path: '/admin/usuarios', icon: Users, roles: ['ADMINISTRADOR'] },
  { label: 'Comunicados', path: '/admin/comunicados', icon: FileText, roles: ['ADMINISTRADOR', 'EDITOR'] },
  { label: 'Eventos', path: '/admin/eventos', icon: Calendar, roles: ['ADMINISTRADOR', 'EDITOR'] },
  { label: 'Docentes', path: '/admin/docentes', icon: GraduationCap, roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
  { label: 'Auxiliares', path: '/admin/auxiliares', icon: UserCheck, roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
  { label: 'Materias', path: '/admin/materias', icon: BookOpen, roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#F5F6F7]">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#0B3558] text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`flex items-center h-16 border-b border-white/10 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'}`}>
          {sidebarOpen && (
            <span className="text-sm font-bold text-white truncate">Panel Administrativo</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block ml-auto text-gray-400 hover:text-white"
            aria-label="Colapsar sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          {sidebarLinks
            .filter((link) => user && link.roles.includes(user.rol))
            .map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#B8202E] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                } ${!sidebarOpen ? 'justify-center' : ''}`}
                title={!sidebarOpen ? link.label : undefined}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-red-600/90 hover:text-white transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}
            title={!sidebarOpen ? 'Cerrar sesión' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-4 shadow-sm">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium text-[#1F2937]">{user?.nombre}</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-[#EAF4FA] text-[#0B3558] font-semibold">{user?.rol}</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
