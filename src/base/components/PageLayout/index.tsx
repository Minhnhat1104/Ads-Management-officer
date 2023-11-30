import { Button, Stack } from '@mui/material';
import React, { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Header from './Header';
import { HEADER_HEIGHT } from '@base/config/constants';

const PageLayout = () => {
  return (
    <Stack>
      <Header />
      <Stack height={`calc(100vh - ${HEADER_HEIGHT}px)`} width={'80%'} margin="auto">
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default PageLayout;
