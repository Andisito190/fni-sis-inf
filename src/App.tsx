import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Auxiliares from './pages/Auxiliares';
import Docentes from './pages/Docentes';
import Eventos from './pages/Eventos';
import EventoDetalle from './pages/EventoDetalle';
import Comunicados from './pages/Comunicados';
import ComunicadoDetalle from './pages/ComunicadoDetalle';
import Contacto from './pages/Contacto';
import Laboratorios from './pages/Laboratorios';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminComunicados from './pages/admin/AdminComunicados';
import AdminEventos from './pages/admin/AdminEventos';
import AdminDocentes from './pages/admin/AdminDocentes';
import AdminAuxiliares from './pages/admin/AdminAuxiliares';
import AdminMaterias from './pages/admin/AdminMaterias';
import Ingresar from './pages/Ingresar';
import EstudianteDashboard from './pages/EstudianteDashboard';
import { useAdminAuth } from './hooks/admin/useAdminAuth';
import { useStudentAuth } from './hooks/student/useStudentAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function StudentRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useStudentAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/ingresar" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="auxiliares" element={<Auxiliares />} />
          <Route path="docentes" element={<Docentes />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="eventos/:id" element={<EventoDetalle />} />
          <Route path="comunicados" element={<Comunicados />} />
          <Route path="comunicados/:id" element={<ComunicadoDetalle />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="laboratorios" element={<Laboratorios />} />
          <Route path="sobre-nosotros" element={<SobreNosotrosPage />} />
        </Route>

        <Route path="/ingresar" element={<Ingresar />} />
        <Route
          path="/estudiante"
          element={
            <StudentRoute>
              <EstudianteDashboard />
            </StudentRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="comunicados" element={<AdminComunicados />} />
          <Route path="eventos" element={<AdminEventos />} />
          <Route path="docentes" element={<AdminDocentes />} />
          <Route path="auxiliares" element={<AdminAuxiliares />} />
          <Route path="materias" element={<AdminMaterias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
