// AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect, Dispatch } from 'react';
import { useNavigate, useMatch } from 'react-router';

interface AuthContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated?: Dispatch<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('accessToken');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const matchLogin = useMatch('/login');

  useEffect(() => {
    if (!storedToken) {
      // Nếu ko có, chuyển đến trang login
      navigate('/login');
      setIsAuthenticated(false);
    } else {
      // Nếu có và đang ở /login, chuyển hướng đến trang todo hoặc trang chính của ứng dụng
      if (matchLogin) {
        navigate('/');
      }
      setIsAuthenticated(true);
    }
  }, [storedToken, matchLogin]);

  // return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
