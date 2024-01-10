import React from 'react';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const PageLayout = lazy(() => import('@base/components/PageLayout'));

const Home = lazy(() => import('@pages/Home'));
const DemoPage = lazy(() => import('@pages/DemoPage/List'));
const ResidentReport = lazy(() => import('@pages/ResidentReport/List'));
const ResidentReportView = lazy(() => import('@pages/ResidentReport/View'));
const AdsManagement = lazy(() => import('@pages/AdsManagement/List'));
const AdsManagementView = lazy(() => import('@pages/AdsManagement/View'));
const AdsLicense = lazy(() => import('@pages/AdsLicense'));
const AdsLicenseView = lazy(() => import('@pages/AdsLicense/View'));
const Login = lazy(() => import('@pages/Login'));
const DetailInfo = lazy(() => import('@pages/DetailInfo'));
const ChangePassword = lazy(() => import('@pages/ChangePassword'));
const AddRequest = lazy(() => import('@pages/AdsLicense/AddRequest'));

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
        path: 'ads-management/:id',
        element: <AdsManagementView />,
      },
      {
        path: 'resident-report',
        element: <ResidentReport />,
      },
      {
        path: 'resident-report/:id',
        element: <ResidentReportView />,
      },
      {
        path: 'ads-license',
        element: <AdsLicense />,
      },
      {
        path: 'ads-license/:id',
        element: <AdsLicenseView />,
      },
      {
        path: 'ads-license/add-request',
        element: <AddRequest />,
      },
      {
        path: 'detail-info',
        element: <DetailInfo />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'demo-page',
        element: <DemoPage />,
      },
    ],
  },
];
