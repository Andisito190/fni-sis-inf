import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { useStudentAuth } from '../hooks/student/useStudentAuth';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function Ingresar() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(() =>
    GOOGLE_CLIENT_ID ? '' : 'Google login no configurado. Agregue VITE_GOOGLE_CLIENT_ID en el .env'
  );
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle } = useStudentAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        setError('');
        setLoading(true);
        try {
          await loginWithGoogle(response.credential);
          navigate('/estudiante');
        } catch {
          setError('No se pudo iniciar sesión con Google');
          setLoading(false);
        }
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
      });
    }
  }, [loginWithGoogle, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B3558] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#0B3558] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#EAF4FA] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-[#0B3558]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0B3558]">Acceso de Estudiantes</h1>
          <p className="text-sm text-[#6B7280] mt-1">Facultad Nacional de Ingeniería</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FCECEE] border border-red-200 rounded-xl text-sm text-[#B8202E] font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <p className="text-sm text-[#6B7280] font-medium py-3">Iniciando sesión...</p>
          ) : (
            <div ref={buttonRef} />
          )}
          <p className="text-xs text-[#9CA3AF] text-center leading-relaxed">
            Al iniciar sesión con Google, si tu correo no está registrado, se creará una cuenta de estudiante automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}