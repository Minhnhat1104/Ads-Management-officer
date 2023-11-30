import React from 'react';
import { Button, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';
import { HEADER_HEIGHT } from '@base/config/constants';
import { useMatch } from 'react-router-dom';

const PageLayout = () => {
  const isHome = useMatch('/');

  return (
    <Stack>
      <Header />
      <Stack height={`calc(100vh - ${HEADER_HEIGHT}px)`} width={isHome ? '100%' : '80%'} margin="auto">
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default PageLayout;
