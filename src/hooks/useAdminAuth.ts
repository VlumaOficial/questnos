import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'consulta';
  is_active: boolean;
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const userStr = localStorage.getItem('adminUser');
      const token = localStorage.getItem('adminToken');

      if (userStr && token) {
        const userData: AdminUser = JSON.parse(userStr);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setUser(null);
    navigate('/admin/login');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isConsulta = () => {
    return user?.role === 'consulta';
  };

  const canDelete = () => {
    return isAdmin();
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
    isConsulta: isConsulta(),
    canDelete: canDelete(),
    logout,
    checkAuth
  };
}
