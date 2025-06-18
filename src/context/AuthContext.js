import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth as authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authApi.login(credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authApi.register(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 