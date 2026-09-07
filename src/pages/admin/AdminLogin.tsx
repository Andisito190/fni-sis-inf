import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAdminAuth } from '../../hooks/admin/useAdminAuth';

export default function AdminLogin() {
  const [nombreU, setNombreU] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ nombre_u: nombreU, contrasenia });
      navigate('/admin');
    } catch {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B3558] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#EAF4FA] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-[#0B3558]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0B3558]">Panel Administrativo</h1>
          <p className="text-sm text-[#6B7280] mt-1">Facultad Nacional de Ingeniería</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FCECEE] border border-red-200 rounded-xl text-sm text-[#B8202E] font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombreU" className="block text-sm font-semibold text-[#374151] mb-1">
              Usuario
            </label>
            <input
              id="nombreU"
              type="text"
              value={nombreU}
              onChange={(e) => setNombreU(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8] focus:border-transparent"
              placeholder="Ingrese su usuario"
            />
          </div>
          <div>
            <label htmlFor="contrasenia" className="block text-sm font-semibold text-[#374151] mb-1">
              Contraseña
            </label>
            <input
              id="contrasenia"
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1684B8] focus:border-transparent"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#B8202E] text-white font-semibold rounded-xl hover:bg-[#8F1825] transition-colors duration-150 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
