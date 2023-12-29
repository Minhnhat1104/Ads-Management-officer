import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
import { Routes } from '@base/routes';

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
  return (
    <RecoilRoot>
      <ThemeCustomization>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          <Suspense fallback={<CircularProgress />}>
            {/* <RouterProvider router={router} /> */}
            <Router>
              <Routes />
            </Router>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeCustomization>
    </RecoilRoot>
  );
}

export default App;
