// AuthContext.tsx
import { accessTokenAtom } from '@base/store/atoms/accessTokenAtom';
import { createContext, useContext, ReactNode, useState, useEffect, Dispatch } from 'react';
import { useNavigate, useMatch } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

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
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const matchLogin = useMatch('/login');

  useEffect(() => {
    if (accessToken === '') {
      console.log('🚀 ~ useEffect ~ accessToken:', accessToken);
      // Nếu ko có, chuyển đến trang login
      navigate('/login');
      setIsAuthenticated(false);
    } else {
      // Nếu có và đang ở /login, chuyển hướng đến trang todo hoặc trang chính của ứng dụng
      if (matchLogin) {
        navigate('/');
      }
      console.log('🚀 ~ useEffect ~ accessToken:', accessToken);

      setIsAuthenticated(true);
    }
  }, [accessToken, matchLogin]);
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
