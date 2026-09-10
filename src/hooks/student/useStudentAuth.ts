import { useState, useEffect, useCallback } from 'react';
import { studentLoginWithGoogle } from '../../services/estudiante';

export interface Estudiante {
  id: number;
  nombre: string;
  rol: string;
}

export function useStudentAuth() {
  const [student, setStudent] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('student_user');
    if (stored) {
      try {
        setStudent(JSON.parse(stored));
      } catch {
        localStorage.removeItem('student_user');
        localStorage.removeItem('student_token');
      }
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const response = await studentLoginWithGoogle(credential);
    localStorage.setItem('student_token', response.token);
    localStorage.setItem('student_user', JSON.stringify(response.usuario));
    setStudent(response.usuario);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('student_token');
    localStorage.removeItem('student_user');
    setStudent(null);
  }, []);

  const isAuthenticated = !!student;

  return { student, loginWithGoogle, logout, loading, isAuthenticated };
}