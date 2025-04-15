import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  lastLoginAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API 기본 설정
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 토큰 갱신 인터셉터
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          return api(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        setAccessToken(storedToken);
        try {
          await refreshToken();
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      setUser(user);
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
      
      // 마지막 로그인 시간 업데이트
      await api.post('/auth/update-last-login');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      const { user, token } = response.data;
      
      setUser(user);
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      const { user, token } = response.data;
      
      setUser(user);
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await api.put('/auth/profile', data);
      setUser(response.data);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw new Error('프로필 업데이트에 실패했습니다.');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await api.post('/auth/reset-password', { email });
    } catch (error) {
      console.error('Password reset failed:', error);
      throw new Error('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await api.put('/auth/update-password', {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Password update failed:', error);
      throw new Error('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        refreshToken,
        updateProfile,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 