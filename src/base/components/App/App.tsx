import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeCustomization from '@base/themes';
import { RecoilRoot } from 'recoil';
import { Box, CssBaseline } from '@mui/material';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeCustomization>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <h1>MainPage</h1>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeCustomization>
    </RecoilRoot>
  );
}

export default App;
