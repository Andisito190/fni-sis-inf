import { useState, useEffect, useCallback } from 'react';
import { adminLogin as apiLogin } from '../../services/admin';
import type { LoginPayload } from '../../types/admin';

interface AdminUser {
  id: number;
  nombre: string;
  rol: string;
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await apiLogin(payload);
    localStorage.setItem('admin_token', response.token);
    localStorage.setItem('admin_user', JSON.stringify(response.usuario));
    setUser(response.usuario);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'ADMINISTRADOR';

  return { user, login, logout, loading, isAuthenticated, isAdmin };
}
