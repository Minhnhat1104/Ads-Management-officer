import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';
import '@goongmaps/goong-js/dist/goong-js.css';

import { Toaster } from 'react-hot-toast';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import '@base/assets/fonts/base.css';
import '@base/assets/scss/app.scss';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeCustomization from '@base/themes';
import { RecoilRoot } from 'recoil';
import { CircularProgress } from '@mui/material';
import AuthProvider from '@base/auth/AuthProvider';
import { routes } from '@base/routes';
import LinearLoader from './LinearLoader';
import NotificationContext from 'src/contexts/NotificationContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

// const router = createBrowserRouter(routes);

function App() {
  const getRoutes = (routes: RouteObject[]) => {
    const recursion = (routes: RouteObject[]) => (
      <>
        {routes.map((_route: any, i: number) => {
          return _route?.children ? (
            <Route key={_route?.path || 'index'} {..._route}>
              {recursion(_route?.children)}
            </Route>
          ) : (
            <Route key={_route?.path || 'index'} {..._route} />
          );
        })}
      </>
    );

    return recursion(routes);
  };

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeCustomization>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" reverseOrder={false} />
            <LinearLoader />
            <Suspense fallback={<CircularProgress />}>
              <AuthProvider>
                <NotificationContext>
                  <Routes>{getRoutes(routes)}</Routes>
                </NotificationContext>
              </AuthProvider>
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeCustomization>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
