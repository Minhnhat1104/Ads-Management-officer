import React, { useContext, useEffect, useState } from 'react';

import { LabelValue } from '@base/types';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HEADER_HEIGHT } from '@base/config/constants';
import { useAccounts } from 'src/hooks/useAccounts';
import { usePlacements } from 'src/hooks/usePlacements';
import { AuthContext } from '@base/auth/AuthProvider';
import MiModal from '@base/components/MiModal';

const navItems: LabelValue[] = [
  {
    label: '  Home',
    value: '/',
  },
  {
    label: 'Ads Management',
    value: 'ads-management',
  },
  {
    label: 'Resident Report',
    value: 'resident-report',
  },
  {
    label: 'Ads license',
    value: 'ads-license',
  },
  {
    label: 'Demo Page',
    value: 'demo-page',
  },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [open, setOpen] = useState<boolean>(false);

  const [account, setAccount] = useState<any>();

  const { data } = useAccounts();

  useEffect(() => {
    if (data) {
      setAccount(data);
      console.log('🚀 ~ file: index.tsx:43 ~ data:', data);
    } else {
      setAccount(null);
      // console.log('🚀 ~ file: index.tsx:43 ~ data:', data);
    }
  }, [data]);

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Stack
          height={HEADER_HEIGHT}
          direction="row"
          alignItems="center"
          justifyContent="left"
          spacing={2}
          borderBottom={border}
          py={1}
          marginLeft={3}
        >
          {navItems.map((_item: LabelValue) => (
            <NavLink key={_item.value} to={_item.value} style={{ textDecoration: 'none' }}>
              {({ isActive, isPending }: any) => {
                if (isActive) {
                  console.log('🚀 ~ file: index.tsx:51 ~ _item:', _item);
                }
                return (
                  <Typography
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: isActive ? theme.palette.primary.main : theme.palette.secondary.main,
                      lineHeight: '40px',
                    }}
                  >
                    {_item.label}
                  </Typography>
                );
              }}
            </NavLink>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack
          height={HEADER_HEIGHT}
          direction="row"
          alignItems="center"
          justifyContent="right"
          spacing={2}
          borderBottom={border}
          py={1}
          marginRight={4}
          sx={{
            cursor: 'pointer',
            transition: 'color 0.3s ease-in-out', // Add a smooth transition for the color change
            '&:hover': {
              color: '#2196f3', // Change the color on hover
            },
          }}
          onClick={() => setOpen(true)}
        >
          <AccountCircleIcon fontSize="small" />
          {account && (
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {account.firstName + ' ' + account.lastName}
            </Typography>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              setIsAuthenticated && setIsAuthenticated(false);
            }}
          >
            Đăng xuất
          </Button>
          {open && (
            <MiModal
              title={'Detail User Information'}
              isOpen={open}
              onClose={() => {
                setOpen(false);
                console.log(open);
              }}
              size="sm"
            >
              <Stack alignItems="center" justifyContent="center" padding={4}>
                <Typography style={{ fontSize: 24, fontWeight: 800, padding: 4 }}>{account.roleName}</Typography>
                <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                  Họ tên: {account?.firstName + ' ' + account?.lastName}
                </Typography>
                <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>Email: {account?.email}</Typography>
                <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>
                  Số điện thoại: {account?.phone}
                </Typography>
                <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>
                  Địa bàn: {account.ward + ', ' + account?.district}
                </Typography>
              </Stack>
            </MiModal>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Header;
