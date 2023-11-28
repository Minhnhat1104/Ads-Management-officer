import { Button, Stack } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import Header from './Header';

const PageLayout = () => {
  return (
    <Stack>
      <Header />
      <Stack flex={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default PageLayout;
