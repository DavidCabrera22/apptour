'use client'

import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null
  })

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setAuthState(prev => ({ ...prev, loading: false }))
        return
      }

      const user = await apiService.getProfile()
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null
      })
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('auth_token')
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await apiService.login(email, password)
      
      localStorage.setItem('auth_token', response.token)
      
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        loading: false,
        error: null
      })

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await apiService.register(userData)
      
      localStorage.setItem('auth_token', response.token)
      
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        loading: false,
        error: null
      })

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      localStorage.removeItem('auth_token')
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      })
    }
  }

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }))
  }

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    checkAuth
  }
}