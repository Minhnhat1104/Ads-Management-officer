// AuthContext.tsx
import { accessTokenAtom } from '@base/store/atoms/accessTokenAtom';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, ReactNode, useState, useEffect, Dispatch } from 'react';
import { useNavigate, useMatch } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

interface AuthContextProps {
  isAuthenticated?: boolean;
  setIsAuthenticated?: Dispatch<boolean>;
  login?: (data: any) => void;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const matchLogin = useMatch('/login');

  useEffect(() => {
    if (accessToken === '') {
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
  }, [matchLogin]);

  const login = (data: any) => {
    // Optionally, you can save the token to localStorage or a cookie
    localStorage.setItem('accessToken', data?.accessToken);
    setAccessToken(data?.accessToken);
    localStorage.setItem('refreshToken', data?.refreshToken);
    setIsAuthenticated && setIsAuthenticated(true);
  };

  const logout = () => {
    /* logic to handle user logout */
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
    console.log('clear cache');

    queryClient.clear();
    setIsAuthenticated && setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
