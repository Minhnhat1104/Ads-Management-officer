import React from 'react';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const PageLayout = lazy(() => import('@base/components/PageLayout'));

const Home = lazy(() => import('@pages/Home'));
const DemoPage = lazy(() => import('@pages/DemoPage/List'));
const ResidentReport = lazy(() => import('@pages/ResidentReport/List'));
const AdsManagement = lazy(() => import('@pages/AdsManagement/List'));
const AdsLicense = lazy(() => import('@pages/AdsLicense'));
const Login = lazy(() => import('@pages/Login'));

export const routes: RouteObject[] = [
  {
    path: '*',
    element: <PageLayout />,
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
