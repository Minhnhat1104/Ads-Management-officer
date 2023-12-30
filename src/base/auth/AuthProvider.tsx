// AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextProps {
  // isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!storedToken) {
      // Nếu ko có, chuyển đến trang login
      navigate('/login');
    } else {
      // Nếu có, chuyển hướng đến trang todo hoặc trang chính của ứng dụng
      navigate('/');
    }
  }, [storedToken]);

  // return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
  return <>{children}</>;
};

export default AuthProvider;
