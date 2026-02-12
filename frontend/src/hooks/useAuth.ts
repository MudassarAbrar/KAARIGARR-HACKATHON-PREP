import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch session from httpOnly cookie via API
  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.isAuthenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const login = async (email: string, role: 'customer' | 'provider' | 'admin' = 'customer') => {
    setIsLoading(true);
    
    try {
      // Simulate API authentication call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        role
      };

      // Store session in httpOnly cookie via API
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user: mockUser }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      setUser(mockUser);
      
      // Redirect based on role
      if (role === 'admin') router.push('/admin/dashboard');
      else if (role === 'provider') router.push('/provider/dashboard');
      else router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, role: 'customer' | 'provider') => {
    setIsLoading(true);

    try {
      // Simulate API registration call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '2',
        name,
        email,
        role
      };

      // Store session in httpOnly cookie via API
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user: mockUser }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      setUser(mockUser);

      if (role === 'provider') router.push('/provider/dashboard');
      else router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/session', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.push('/auth');
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    refreshSession: fetchSession,
  };
}
