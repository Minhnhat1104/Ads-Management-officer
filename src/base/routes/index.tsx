import React from 'react';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const PageLayout = lazy(() => import('@base/components/PageLayout'));

const Home = lazy(() => import('@pages/Home'));
const AdsManagement = lazy(() => import('@pages/AdsManagement/List'));
const ResidentReport = lazy(() => import('@pages/ResidentReport'));
const AdsLicense = lazy(() => import('@pages/AdsLicense'));

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
    ],
  },
];
