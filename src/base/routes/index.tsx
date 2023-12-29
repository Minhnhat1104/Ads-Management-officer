import React from 'react';

import { lazy } from 'react';
import { Navigate, RouteObject, useNavigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@base/auth/AuthContext';
const PageLayout = lazy(() => import('@base/components/PageLayout'));

const Home = lazy(() => import('@pages/Home'));
const DemoPage = lazy(() => import('@pages/DemoPage/List'));
const ResidentReport = lazy(() => import('@pages/ResidentReport/List'));
const AdsManagement = lazy(() => import('@pages/AdsManagement/List'));
const AdsLicense = lazy(() => import('@pages/AdsLicense'));
const Login = lazy(() => import('@pages/Login'));

// const { isAuthenticated } = useAuth();

export const Routes = () => {
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated', isAuthenticated);

  const routes: RouteObject[] = [
    {
      path: '*',
      element: isAuthenticated ? <PageLayout /> : <Login />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'ads-management',
          element: <AdsManagement />,
        },
        {
          path: 'resident-report',
          element: <ResidentReport />,
        },
        {
          path: 'ads-license',
          element: <AdsLicense />,
        },
        {
          path: 'demo-page',
          element: <DemoPage />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
