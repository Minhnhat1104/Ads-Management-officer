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
        {routes.map(({ path, element, children }, i: number) => {
          return children ? (
            <Route key={path || 'index'} path={path} element={element}>
              {recursion(children)}
            </Route>
          ) : (
            <Route key={path || 'index'} path={path} element={element} />
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
            <Suspense fallback={<CircularProgress />}>
              <AuthProvider>
                <Routes>{getRoutes(routes)}</Routes>
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
